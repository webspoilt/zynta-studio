use metrics::{counter, histogram, gauge};
use std::sync::Arc;
use tokio::sync::Mutex;
use std::collections::HashMap;
use std::time::Instant;

#[derive(Clone)]
pub struct KpiCollector {
    // We'll store recent task attempts and outcomes
    tasks: Arc<Mutex<HashMap<String, TaskMetrics>>>,
}

#[derive(Debug)]
struct TaskMetrics {
    start: Instant,
    turns: usize,
    tool_calls: usize,
    hallucinated: bool,
}

impl KpiCollector {
    pub fn new() -> Self {
        Self {
            tasks: Arc::new(Mutex::new(HashMap::new())),
        }
    }

    pub async fn record_task_start(&self, task_id: String) {
        let mut tasks = self.tasks.lock().await;
        tasks.insert(task_id, TaskMetrics {
            start: Instant::now(),
            turns: 0,
            tool_calls: 0,
            hallucinated: false,
        });
    }

    pub async fn record_turn(&self, task_id: &str) {
        if let Some(metrics) = self.tasks.lock().await.get_mut(task_id) {
            metrics.turns += 1;
        }
    }

    pub async fn record_tool_call(&self, task_id: &str) {
        if let Some(metrics) = self.tasks.lock().await.get_mut(task_id) {
            metrics.tool_calls += 1;
        }
    }

    pub async fn record_hallucination(&self, task_id: &str) {
        if let Some(metrics) = self.tasks.lock().await.get_mut(task_id) {
            metrics.hallucinated = true;
        }
    }

    pub async fn record_task_end(&self, task_id: &str, success: bool) {
        let metrics = self.tasks.lock().await.remove(task_id);
        if let Some(metrics) = metrics {
            let latency = metrics.start.elapsed();
            histogram!("execution_latency_seconds", latency.as_secs_f64());
            if success {
                counter!("task_success_total").increment(1);
            } else {
                counter!("task_failure_total").increment(1);
            }
            gauge!("turns_to_completion", metrics.turns as f64);
            gauge!("tool_calls_per_task", metrics.tool_calls as f64);
            if metrics.hallucinated {
                counter!("tool_hallucination_total").increment(1);
            }
        }
    }
}

pub struct TelemetryEngine {
    collector: KpiCollector,
}

impl TelemetryEngine {
    pub fn new() -> Self {
        Self {
            collector: KpiCollector::new(),
        }
    }

    pub fn collector(&self) -> KpiCollector {
        self.collector.clone()
    }

    // Start a Prometheus exporter on a given port
    pub async fn start_exporter(&self, port: u16) -> Result<(), Box<dyn std::error::Error>> {
        use metrics_exporter_prometheus::PrometheusBuilder;
        PrometheusBuilder::new()
            .with_http_listener(([0,0,0,0], port))
            .install()?;
        Ok(())
    }
}
