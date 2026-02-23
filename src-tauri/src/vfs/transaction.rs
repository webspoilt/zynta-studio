use std::path::PathBuf;
use std::sync::Arc;
use tokio::sync::RwLock;
use serde::{Serialize, Deserialize};
use uuid::Uuid;

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Snapshot {
    pub path: PathBuf,
    pub content: Option<Vec<u8>>, // None represents a non-existent file state
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct TransactionRecord {
    pub id: Uuid,
    pub timestamp: i64,
    pub snapshots: Vec<Snapshot>,
}

pub struct TransactionManager {
    // In-memory log for fast undo; persisted to disk in prod
    history: Arc<RwLock<Vec<TransactionRecord>>>, 
}

impl TransactionManager {
    pub fn new() -> Self {
        Self {
            history: Arc::new(RwLock::new(Vec::new())),
        }
    }

    /// Captures the state of files BEFORE modification.
    pub async fn begin_transaction(&self, targets: &[PathBuf]) -> Uuid {
        let tx_id = Uuid::new_v4();
        let mut snapshots = Vec::new();

        for path in targets {
            let snapshot = if path.exists() {
                Snapshot {
                    path: path.clone(),
                    content: Some(std::fs::read(path).unwrap_or_default()),
                }
            } else {
                Snapshot {
                    path: path.clone(),
                    content: None, // Mark as "did not exist"
                }
            };
            snapshots.push(snapshot);
        }

        let record = TransactionRecord {
            id: tx_id,
            timestamp: chrono::Utc::now().timestamp(),
            snapshots,
        };

        let mut history = self.history.write().await;
        history.push(record);
        tx_id
    }

    /// Restores the workspace to the state before the specific transaction.
    pub async fn rollback(&self, tx_id: Uuid) -> Result<(), String> {
        let history = self.history.read().await;
        
        if let Some(record) = history.iter().find(|r| r.id == tx_id) {
            for snap in &record.snapshots {
                match &snap.content {
                    Some(data) => {
                        // Restore previous content
                        if let Some(parent) = snap.path.parent() {
                            std::fs::create_dir_all(parent).map_err(|e| e.to_string())?;
                        }
                        std::fs::write(&snap.path, data).map_err(|e| e.to_string())?;
                    },
                    None => {
                        // File did not exist, delete it
                        if snap.path.exists() {
                            std::fs::remove_file(&snap.path).map_err(|e| e.to_string())?;
                        }
                    }
                }
            }
            Ok(())
        } else {
            Err(format!("Transaction {} not found", tx_id))
        }
    }
}
