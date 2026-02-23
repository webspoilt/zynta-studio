use crate::agents::{core::AgentBehavior, protocol::{Message, MessageType, Contract}, memory::SharedKnowledgeBase};
use async_trait::async_trait;
use serde_json::{json, Value};

pub struct BlueTeamAgent {
    knowledge: SharedKnowledgeBase,
}

impl BlueTeamAgent {
    pub fn new(knowledge: SharedKnowledgeBase) -> Self {
        Self { knowledge }
    }

    // Analyze attack and generate patch
    fn generate_patch(&self, attack: &Value) -> Value {
        json!({ "patch": "defense logic", "vulnerability": attack["payload"] })
    }
}

#[async_trait]
impl AgentBehavior for BlueTeamAgent {
    async fn handle_message(&mut self, msg: Message) -> Result<Message, String> {
        match msg.msg_type {
            MessageType::Request => {
                // Received an attack message
                let patch = self.generate_patch(&msg.content);
                Ok(Message {
                    id: uuid::Uuid::new_v4().to_string(),
                    from: msg.to.unwrap(),
                    to: Some(msg.from),
                    msg_type: MessageType::Response,
                    content: patch,
                    contract_id: None,
                    timestamp: chrono::Utc::now(),
                })
            }
            _ => Err("Unexpected".into()),
        }
    }

    fn get_contract(&self) -> Contract {
        Contract {
            id: uuid::Uuid::new_v4().to_string(),
            initiator: uuid::Uuid::nil(),
            participants: vec![],
            terms: json!({ "role": "blueteam" }),
            status: crate::agents::protocol::ContractStatus::Active,
        }
    }
}
