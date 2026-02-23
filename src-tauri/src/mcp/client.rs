use reqwest::Client;
use serde_json::{json, Value};
use std::time::Duration;

pub struct McpClient {
    http_client: Client,
    base_url: String,
    auth_token: String,
}

impl McpClient {
    pub fn new(base_url: &str, auth_token: &str) -> Self {
        Self {
            http_client: Client::builder()
                .timeout(Duration::from_secs(30))
                .build()
                .unwrap(),
            base_url: base_url.to_string(),
            auth_token: auth_token.to_string(),
        }
    }

    pub async fn call_tool(&self, tool: &str, params: Value, task_id: Option<&str>) -> Result<Value, String> {
        let url = format!("{}/mcp/tools/{}", self.base_url, tool);
        let mut request = self.http_client.post(&url)
            .bearer_auth(&self.auth_token)
            .json(&json!({ "params": params, "task_id": task_id }));

        let response = request.send().await.map_err(|e| e.to_string())?;
        if !response.status().is_success() {
            return Err(format!("MCP call failed: {}", response.status()));
        }
        response.json().await.map_err(|e| e.to_string())
    }
}
