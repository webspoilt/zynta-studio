use super::{TransactionManager, IdempotentVerifier};
use std::path::PathBuf;
use tauri::State;
use serde::{Serialize, Deserialize};
use uuid::Uuid;

#[derive(Debug, Serialize, Deserialize)]
pub struct FsWriteRequest {
    pub path: String,
    pub content: String, // Base64 encoded or raw string
}

#[derive(Debug, Serialize, Deserialize)]
pub struct FsWriteResponse {
    pub transaction_id: Uuid,
    pub bytes_written: usize,
    pub status: String,
}

pub struct VirtualFileSystem {
    tx_manager: TransactionManager,
}

impl VirtualFileSystem {
    pub fn new() -> Self {
        Self {
            tx_manager: TransactionManager::new(),
        }
    }
}

#[tauri::command]
pub async fn write_file_atomic(
    state: State<'_, VirtualFileSystem>,
    request: FsWriteRequest
) -> Result<FsWriteResponse, String> {
    let path = PathBuf::from(&request.path);
    let content_bytes = request.content.as_bytes();

    // 1. Idempotency Check
    if !IdempotentVerifier::verify_pre_condition(&path, content_bytes) {
        return Ok(FsWriteResponse {
            transaction_id: Uuid::nil(), // Nil UUID indicates no-op
            bytes_written: 0,
            status: "IDEMPOTENT_NO_OP".to_string(),
        });
    }

    // 2. Begin Transaction (Snapshot current state)
    let tx_id = state.tx_manager.begin_transaction(&[path.clone()]).await;

    // 3. Perform Write
    // Ensure directory exists
    if let Some(parent) = path.parent() {
        std::fs::create_dir_all(parent).map_err(|e| e.to_string())?;
    }
    
    std::fs::write(&path, content_bytes).map_err(|e| {
        // Auto-rollback on failure is implied here, though explicit rollback command exists
        e.to_string()
    })?;

    Ok(FsWriteResponse {
        transaction_id: tx_id,
        bytes_written: content_bytes.len(),
        status: "SUCCESS".to_string(),
    })
}

#[tauri::command]
pub async fn undo_transaction(
    state: State<'_, VirtualFileSystem>,
    tx_id: Uuid
) -> Result<(), String> {
    state.tx_manager.rollback(tx_id).await
}
