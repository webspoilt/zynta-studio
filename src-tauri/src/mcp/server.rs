use super::auth::OAuth2Validator;
use super::telemetry::KpiCollector;
use async_trait::async_trait;
use serde_json::Value;
use std::collections::HashMap;
use tokio::sync::RwLock;

pub type ToolResult = Result<Value, String>;

#[async_trait]
pub trait Tool: Send + Sync {
    async fn execute(&self, params: Value) -> ToolResult;
    fn name(&self) -> &'static str;
}

pub struct McpServer {
    tools: RwLock<HashMap<String, Box<dyn Tool>>>,
    auth_validator: OAuth2Validator,
    telemetry: KpiCollector,
}

impl McpServer {
    pub fn new(secret: &[u8], telemetry: KpiCollector) -> Self {
        Self {
            tools: RwLock::new(HashMap::new()),
            auth_validator: OAuth2Validator::new(secret),
            telemetry,
        }
    }

    pub async fn register_tool(&self, tool: Box<dyn Tool>) {
        let name = tool.name().to_string();
        self.tools.write().await.insert(name, tool);
    }

    pub async fn handle_request(
        &self,
        token: &str,
        tool_name: &str,
        params: Value,
        task_id: Option<String>,
    ) -> ToolResult {
        // Validate OAuth token
        let claims = self.auth_validator.validate_token(token)
            .map_err(|e| format!("Authentication failed: {}", e))?;

        // Check scope (simplified)
        if !claims.scope.contains("mcp:execute") {
            return Err("Insufficient scope".into());
        }

        // Start telemetry for this task if task_id provided
        if let Some(tid) = &task_id {
            self.telemetry.record_task_start(tid.clone()).await;
        }

        // Find tool
        let tools = self.tools.read().await;
        let tool = tools.get(tool_name).ok_or_else(|| format!("Tool '{}' not found", tool_name))?;

        // Record tool call
        if let Some(tid) = &task_id {
            self.telemetry.record_tool_call(tid).await;
        }

        // Execute
        let start = std::time::Instant::now();
        let result = tool.execute(params).await;
        let latency = start.elapsed();

        // Update telemetry
        if let Some(tid) = &task_id {
            self.telemetry.record_task_end(tid, result.is_ok()).await;
        }

        // Record latency histogram
        metrics::histogram!("tool_execution_latency_seconds", latency.as_secs_f64(), "tool" => tool_name.to_string());

        result
    }
}
