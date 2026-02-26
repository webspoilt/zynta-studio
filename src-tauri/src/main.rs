#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod vfs;
mod commands;
mod mcp;
mod agents;
mod aex;
mod redteam;
mod llm;
mod redact;
mod network;
mod ast;
mod git;
mod time_travel;
mod provenance;

use tauri::Manager;
use mcp::telemetry::TelemetryEngine;

mod orchestrator;

#[tokio::main]
async fn main() {
    tracing_subscriber::fmt::init();

    // Initialize telemetry
    let telemetry = TelemetryEngine::new();
    let kpi_collector = telemetry.collector();
    
    // Start Prometheus exporter on port 9090
    tokio::spawn(async move {
        if let Err(e) = telemetry.start_exporter(9090).await {
            eprintln!("Failed to start telemetry exporter: {}", e);
        }
    });

    // Create MCP server with a secret
    let mcp_server = mcp::server::McpServer::new(b"my-oauth-secret", kpi_collector);

    tauri::Builder::default()
        .setup(move |app| {
            let vfs_engine = vfs::engine::VirtualFileSystem::new();
            app.manage(vfs_engine);
            app.manage(mcp_server); // Manage MCP server as state
            app.manage(llm::LocalLlmEngine::default()); // Manage Local Ollama Engine
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![
            // VFS commands
            vfs::engine::write_file_atomic,
            vfs::engine::undo_transaction,
            // MCP commands
            commands::mcp::mcp_call_tool,
            // UI generative commands
            commands::ui::generate_ui_asset,
            // Tree visualisation
            commands::tree::get_execution_tree,
            // Health commands
            commands::health::health,
            commands::health::ready,
            // Local LLM
            commands::llm::ask_ollama,
            // SEMAP Actor System
            commands::semap::spawn_semap_agent,
            commands::semap::query_semap_status,
            commands::semap::list_active_agents,
            // AST Parsing
            commands::ast::parse_file_ast,
            commands::ast::get_ast_tree,
            // Native Git
            commands::git::git_clone,
            commands::git::git_commit,
            commands::git::git_pull,
            commands::git::git_push,
            commands::git::git_status,
            commands::git::git_log,
            commands::git::git_repo_info,
            // Time Travel Debugger
            commands::time_travel::record_state,
            commands::time_travel::get_timeline,
            commands::time_travel::get_snapshot,
            commands::time_travel::detect_drift,
            commands::time_travel::clear_debug_timeline,
            // Code Provenance Ledger
            commands::provenance::record_provenance,
            commands::provenance::query_provenance,
            commands::provenance::verify_chain,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
