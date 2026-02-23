use super::core::AgentId;
use super::protocol::Message;

pub struct DebateRound {
    pub topic: String,
    pub participants: Vec<AgentId>,
    pub arguments: Vec<Message>,
    pub consensus: Option<serde_json::Value>,
}

impl DebateRound {
    pub fn new(topic: String, participants: Vec<AgentId>) -> Self {
        Self {
            topic,
            participants,
            arguments: Vec::new(),
            consensus: None,
        }
    }

    pub fn add_argument(&mut self, msg: Message) {
        self.arguments.push(msg);
    }

    // Simple voting: if >50% agree, consensus reached
    pub fn reach_consensus(&mut self) -> bool {
        // Simplified: check if last message indicates agreement from majority
        // In reality, would analyze arguments
        false
    }
}
