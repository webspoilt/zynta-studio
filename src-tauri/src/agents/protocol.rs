use serde::{Deserialize, Serialize};
use super::AgentId;

#[derive(Debug, Clone, Serialize, Deserialize)]
pub enum MessageType {
    Request,
    Response,
    Broadcast,
    Debate,
    Bid,
    Award,
    Report,
    Verification,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Message {
    pub id: String,
    pub from: AgentId,
    pub to: Option<AgentId>,  // None for broadcast
    pub msg_type: MessageType,
    pub content: serde_json::Value,
    pub contract_id: Option<String>, // reference to contract
    pub timestamp: chrono::DateTime<chrono::Utc>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Contract {
    pub id: String,
    pub initiator: AgentId,
    pub participants: Vec<AgentId>,
    pub terms: serde_json::Value, // e.g., expected inputs/outputs, constraints
    pub status: ContractStatus,
}

#[derive(Debug, Clone, Serialize, Deserialize, PartialEq)]
pub enum ContractStatus {
    Proposed,
    Accepted,
    Active,
    Completed,
    Failed,
}
