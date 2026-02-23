use sha2::{Sha256, Digest};
use std::path::PathBuf;
use serde::{Serialize, Deserialize};

#[derive(Debug, Serialize, Deserialize)]
pub struct ContentHash(pub String);

impl ContentHash {
    pub fn new(data: &[u8]) -> Self {
        let mut hasher = Sha256::new();
        hasher.update(data);
        Self(hex::encode(hasher.finalize()))
    }
}

#[derive(Debug, Serialize, Deserialize)]
pub struct IdempotencyCheck {
    pub target_path: PathBuf,
    pub expected_hash: Option<ContentHash>,
    pub operation_type: OperationType,
}

#[derive(Debug, Serialize, Deserialize)]
pub enum OperationType {
    Create,
    Modify,
    Delete,
}

pub struct IdempotentVerifier;

impl IdempotentVerifier {
    /// Verifies if an operation is necessary based on current state.
    /// Returns true if the operation should proceed, false if it is redundant.
    pub fn verify_pre_condition(path: &PathBuf, intended_content: &[u8]) -> bool {
        if !path.exists() {
            return true; // Creation is always idempotent if not exists
        }

        match std::fs::read(path) {
            Ok(current_content) => {
                let current_hash = ContentHash::new(&current_content);
                let intended_hash = ContentHash::new(intended_content);
                
                // If hashes match, the state is already achieved. 
                // Operation is redundant (idempotent success).
                current_hash.0 != intended_hash.0
            },
            Err(e) => {
                tracing::error!("VFS Read Error: {}", e);
                true // Proceed to let the operation handle the error
            }
        }
    }
}
