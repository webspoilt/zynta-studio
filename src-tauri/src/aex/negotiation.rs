use crate::agents::protocol::Message;
use crate::agents::core::AgentId;
use serde_json::{json, Value};

pub struct NegotiationSession {
    pub task_id: String,
    pub agents: Vec<AgentId>,
    pub proposals: Vec<Message>,
    pub agreement: Option<Value>,
}

impl NegotiationSession {
    pub fn new(task_id: String, agents: Vec<AgentId>) -> Self {
        Self {
            task_id,
            agents,
            proposals: Vec::new(),
            agreement: None,
        }
    }

    // Process a proposal message and check if consensus reached
    pub fn process_proposal(&mut self, msg: Message) -> Option<Value> {
        self.proposals.push(msg);
        // Simplified: if all agents have agreed on a division, return it
        // In reality, we'd analyze the natural language content
        if self.proposals.len() >= self.agents.len() {
            // Dummy agreement
            self.agreement = Some(json!({ "division": "equal" }));
            self.agreement.clone()
        } else {
            None
        }
    }
}
