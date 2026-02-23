use serde::Deserialize;
use reqwest::Client;

#[derive(Deserialize)]
pub struct GenerateUIPayload {
    prompt: String,
    r#type: String, // "svg", "theme", "icon"
}

#[tauri::command]
pub async fn generate_ui_asset(payload: GenerateUIPayload) -> Result<String, String> {
    // Call external generative model API (e.g., Gemini 2.5 Flash)
    let client = Client::new();
    let api_key = std::env::var("GEMINI_API_KEY").unwrap_or_default();
    let response = client
        .post("https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent")
        .query(&[("key", api_key)])
        .json(&serde_json::json!({
            "contents": [{
                "parts": [{"text": format!("Generate {}: {}", payload.r#type, payload.prompt)}]
            }]
        }))
        .send()
        .await
        .map_err(|e| e.to_string())?;

    let body: serde_json::Value = response.json().await.map_err(|e| e.to_string())?;
    // Extract generated asset (simplified)
    let asset = body["candidates"][0]["content"]["parts"][0]["text"]
        .as_str()
        .unwrap_or("")
        .to_string();
    Ok(asset)
}
