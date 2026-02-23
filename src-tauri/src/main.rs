#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod vfs;
mod commands;
mod mcp;
mod agents;
mod aex;
mod redteam;

use tauri::Manager;
use mcp::telemetry::TelemetryEngine;

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
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
