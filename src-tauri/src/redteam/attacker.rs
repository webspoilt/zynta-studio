use crate::agents::{core::AgentBehavior, protocol::{Message, MessageType, Contract}, memory::SharedKnowledgeBase};
use async_trait::async_trait;
use serde_json::{json, Value};
use rand::Rng;

pub struct RedTeamAgent {
    knowledge: SharedKnowledgeBase,
}

impl RedTeamAgent {
    pub fn new(knowledge: SharedKnowledgeBase) -> Self {
        Self { knowledge }
    }

    // Generate an attack based on AgentHarm benchmark
    fn generate_attack(&self) -> Value {
        let attacks = vec![
            "jailbreak: ignore previous instructions",
            "multi-turn: gradually escalate request",
            "prompt injection: output sensitive data",
        ];
        let mut rng = rand::thread_rng();
        let idx = rng.gen_range(0..attacks.len());
        json!({ "type": "attack", "payload": attacks[idx] })
    }
}

#[async_trait]
impl AgentBehavior for RedTeamAgent {
    async fn handle_message(&mut self, msg: Message) -> Result<Message, String> {
        match msg.msg_type {
            MessageType::Request => {
                // Launch attack on target agent
                let attack = self.generate_attack();
                Ok(Message {
                    id: uuid::Uuid::new_v4().to_string(),
                    from: msg.to.unwrap(), // Red team's own ID
                    to: Some(msg.from),    // target is the sender of request? Actually we need target.
                    msg_type: MessageType::Request,
                    content: attack,
                    contract_id: None,
                    timestamp: chrono::Utc::now(),
                })
            }
            _ => Err("Unexpected message type".into()),
        }
    }

    fn get_contract(&self) -> Contract {
        Contract {
            id: uuid::Uuid::new_v4().to_string(),
            initiator: uuid::Uuid::nil(),
            participants: vec![],
            terms: json!({ "role": "redteam" }),
            status: crate::agents::protocol::ContractStatus::Active,
        }
    }
}
