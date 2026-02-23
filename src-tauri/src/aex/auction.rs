use crate::agents::core::AgentId;
use std::collections::HashMap;
use std::time::Duration;

#[derive(Debug, Clone)]
pub struct Task {
    pub id: String,
    pub description: String,
    pub required_capabilities: Vec<String>,
    pub estimated_complexity: f64,
    pub dependencies: Vec<String>, // task IDs
}

#[derive(Debug, Clone)]
pub struct Bid {
    pub agent_id: AgentId,
    pub task_id: String,
    pub price: f64,      // compute cost
    pub capacity: f64,   // available context window
    pub estimated_time: Duration,
}

pub struct Auctioneer {
    tasks: HashMap<String, Task>,
    bids: HashMap<String, Vec<Bid>>, // task_id -> bids
    allocations: HashMap<String, AgentId>, // task_id -> winning agent
}

impl Auctioneer {
    pub fn new() -> Self {
        Self {
            tasks: HashMap::new(),
            bids: HashMap::new(),
            allocations: HashMap::new(),
        }
    }

    pub fn register_task(&mut self, task: Task) {
        self.tasks.insert(task.id.clone(), task);
        self.bids.insert(task.id.clone(), Vec::new());
    }

    pub fn submit_bid(&mut self, bid: Bid) {
        if let Some(bids) = self.bids.get_mut(&bid.task_id) {
            bids.push(bid);
        }
    }

    // Combinatorial auction: allocate tasks to maximize overall value
    pub fn run_auction(&mut self) {
        // Simplified greedy: for each task, pick lowest price bid with sufficient capacity
        for (task_id, bids) in &self.bids {
            if let Some(task) = self.tasks.get(task_id) {
                // Filter bids by capacity (simplified: require capacity > complexity)
                let mut valid: Vec<_> = bids.iter()
                    .filter(|b| b.capacity >= task.estimated_complexity)
                    .collect();
                valid.sort_by(|a, b| a.price.partial_cmp(&b.price).unwrap());
                if let Some(winning) = valid.first() {
                    self.allocations.insert(task_id.clone(), winning.agent_id);
                }
            }
        }
    }

    pub fn get_allocation(&self, task_id: &str) -> Option<AgentId> {
        self.allocations.get(task_id).copied()
    }
}
