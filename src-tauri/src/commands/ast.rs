//! Tauri commands for AST parsing
//!
//! Exposes file analysis and Mermaid diagram generation to the frontend.

use crate::ast;

/// Parse a file and return a Mermaid flowchart diagram string.
/// The frontend can render this directly in the "Architecture Vis" tab.
#[tauri::command]
pub fn parse_file_ast(path: String) -> Result<String, String> {
    let source = std::fs::read_to_string(&path)
        .map_err(|e| format!("Failed to read file '{}': {}", path, e))?;

    let tree = ast::parse_file(&path, &source);
    let mermaid = ast::generate_mermaid(&tree);

    Ok(mermaid)
}

/// Parse a file and return the raw AST tree as JSON.
#[tauri::command]
pub fn get_ast_tree(path: String) -> Result<String, String> {
    let source = std::fs::read_to_string(&path)
        .map_err(|e| format!("Failed to read file '{}': {}", path, e))?;

    let tree = ast::parse_file(&path, &source);

    serde_json::to_string_pretty(&tree)
        .map_err(|e| format!("Failed to serialize AST: {}", e))
}
