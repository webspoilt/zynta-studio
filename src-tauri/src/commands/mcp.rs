use tauri::State;
use serde::Deserialize;
use serde_json::Value;
use crate::mcp::server::McpServer;

#[derive(Deserialize)]
pub struct McpCallPayload {
    token: String,
    tool: String,
    params: Value,
    task_id: Option<String>,
}

#[tauri::command]
pub async fn mcp_call_tool(
    state: State<'_, McpServer>,
    payload: McpCallPayload,
) -> Result<Value, String> {
    state.handle_request(&payload.token, &payload.tool, payload.params, payload.task_id).await
}
