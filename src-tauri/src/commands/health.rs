#[tauri::command]
pub fn health() -> &'static str {
    "ok"
}

#[tauri::command]
pub fn ready() -> &'static str {
    "ready"
}
