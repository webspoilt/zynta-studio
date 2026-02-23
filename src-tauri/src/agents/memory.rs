use dashmap::DashMap;
use serde_json::Value;
use std::sync::Arc;

#[derive(Clone)]
pub struct SharedKnowledgeBase {
    store: Arc<DashMap<String, Value>>,
}

impl SharedKnowledgeBase {
    pub fn new() -> Self {
        Self {
            store: Arc::new(DashMap::new()),
        }
    }

    pub fn insert(&self, key: String, value: Value) {
        self.store.insert(key, value);
    }

    pub fn get(&self, key: &str) -> Option<Value> {
        self.store.get(key).map(|v| v.clone())
    }

    pub fn remove(&self, key: &str) -> Option<Value> {
        self.store.remove(key).map(|(_, v)| v)
    }
}
