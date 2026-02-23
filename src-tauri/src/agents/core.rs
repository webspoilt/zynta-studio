use serde::{Deserialize, Serialize};
use tokio::sync::mpsc;
use uuid::Uuid;

pub type AgentId = Uuid;

#[derive(Debug, Clone, Serialize, Deserialize)]
pub enum AgentType {
    Frontend,
    Backend,
    DevOps,
    QA,
    RedTeam,
    BlueTeam,
}

#[derive(Debug, Clone, PartialEq)]
pub enum AgentState {
    Idle,
    Busy,
    Debating,
    Executing,
    Verifying,
}

#[async_trait::async_trait]
pub trait AgentBehavior: Send + Sync {
    async fn handle_message(&mut self, msg: super::protocol::Message) -> Result<super::protocol::Message, String>;
    fn get_contract(&self) -> super::protocol::Contract;
}

pub struct Agent {
    pub id: AgentId,
    pub agent_type: AgentType,
    pub state: AgentState,
    pub inbox: mpsc::UnboundedReceiver<super::protocol::Message>,
    pub outbox: mpsc::UnboundedSender<super::protocol::Message>,
    pub behavior: Box<dyn AgentBehavior>,
    pub knowledge_base: super::memory::SharedKnowledgeBase,
}

impl Agent {
    pub fn new(
        agent_type: AgentType,
        behavior: Box<dyn AgentBehavior>,
        knowledge_base: super::memory::SharedKnowledgeBase,
    ) -> (Self, mpsc::UnboundedSender<super::protocol::Message>) {
        let (tx_in, rx_in) = mpsc::unbounded_channel();
        let (tx_out, _) = mpsc::unbounded_channel(); // outbox sender for others to subscribe
        let agent = Self {
            id: Uuid::new_v4(),
            agent_type,
            state: AgentState::Idle,
            inbox: rx_in,
            outbox: tx_out.clone(),
            behavior,
            knowledge_base,
        };
        (agent, tx_in) // return agent and its inbox sender
    }

    pub async fn run(mut self) {
        while let Some(msg) = self.inbox.recv().await {
            self.state = AgentState::Busy;
            let response = self.behavior.handle_message(msg).await;
            self.state = AgentState::Idle;
            // Send response via outbox if needed
            if let Ok(resp) = response {
                let _ = self.outbox.send(resp);
            }
        }
    }
}
