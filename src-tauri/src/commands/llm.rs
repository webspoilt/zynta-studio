use serde::{Deserialize, Serialize};
use tauri::State;
use tracing::error;

use crate::llm::LocalLlmEngine;

#[derive(Serialize)]
pub struct LlmResponse {
    pub success: bool,
    pub response: String,
    pub error: Option<String>,
}

#[tauri::command]
pub async fn ask_ollama(prompt: String, engine: State<'_, LocalLlmEngine>) -> Result<LlmResponse, String> {
    match engine.generate(&prompt).await {
        Ok(res) => Ok(LlmResponse {
            success: true,
            response: res,
            error: None,
        }),
        Err(e) => {
            error!("Failed to generate from Ollama: {}", e);
            Ok(LlmResponse {
                success: false,
                response: String::new(),
                error: Some(e.to_string()),
            })
        }
    }
}
