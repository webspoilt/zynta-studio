use crate::agents::*;
use tokio::sync::mpsc;
use std::collections::HashMap;
use serde_json::json;

pub struct Orchestrator {
    agents: HashMap<AgentId, mpsc::UnboundedSender<Message>>,
    knowledge_base: SharedKnowledgeBase,
}

impl Orchestrator {
    pub fn new() -> Self {
        Self {
            agents: HashMap::new(),
            knowledge_base: SharedKnowledgeBase::new(),
        }
    }

    pub fn register_agent(&mut self, agent_type: AgentType, behavior: Box<dyn core::AgentBehavior>) -> AgentId {
        let (agent, inbox_tx) = core::Agent::new(agent_type, behavior, self.knowledge_base.clone());
        let id = agent.id;
        tokio::spawn(agent.run());
        self.agents.insert(id, inbox_tx);
        id
    }

    pub async fn send_message(&self, msg: Message) -> Result<(), String> {
        if let Some(to) = msg.to {
            if let Some(tx) = self.agents.get(&to) {
                tx.send(msg).map_err(|e| e.to_string())
            } else {
                Err("Recipient not found".into())
            }
        } else {
            // Broadcast to all
            for tx in self.agents.values() {
                let _ = tx.send(msg.clone());
            }
            Ok(())
        }
    }

    // Lifecycle management: start a task with given contract
    pub async fn start_task(&self, contract: protocol::Contract) {
        // Notify participants
        for participant in &contract.participants {
            let msg = Message {
                id: uuid::Uuid::new_v4().to_string(),
                from: contract.initiator,
                to: Some(*participant),
                msg_type: MessageType::Request,
                content: json!({ "contract": contract.clone() }),
                contract_id: Some(contract.id.clone()),
                timestamp: chrono::Utc::now(),
            };
            let _ = self.send_message(msg).await;
        }
    }
}
