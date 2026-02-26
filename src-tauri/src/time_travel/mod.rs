//! Neural Time Travel State Debugger Backend
//!
//! Records variable states in an in-memory ring buffer, allowing
//! users to "scrub" through execution time and replay state changes.
//! The AI can automatically detect when state drifted unexpectedly.

use serde::{Deserialize, Serialize};
use std::collections::{BTreeMap, HashMap};
use std::sync::Mutex;
use lazy_static::lazy_static;
use chrono::{DateTime, Utc};

// ─────────────────────────────────────────────────────────
//  Data Types
// ─────────────────────────────────────────────────────────

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct StateSnapshot {
    pub timestamp_ms: u64,
    pub label: String,
    pub variables: HashMap<String, String>,
    pub callstack: Vec<String>,
    pub is_drift_point: bool,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct DriftReport {
    pub variable: String,
    pub expected: String,
    pub actual: String,
    pub drift_at_ms: u64,
    pub explanation: String,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Timeline {
    pub total_snapshots: usize,
    pub duration_ms: u64,
    pub drift_points: Vec<u64>,
    pub snapshots: Vec<StateSnapshot>,
}

// ─────────────────────────────────────────────────────────
//  Ring Buffer Recorder
// ─────────────────────────────────────────────────────────

const MAX_SNAPSHOTS: usize = 1024;

lazy_static! {
    static ref TIMELINE: Mutex<Vec<StateSnapshot>> = Mutex::new(Vec::new());
}

/// Record a new state snapshot into the timeline
pub fn record_snapshot(snapshot: StateSnapshot) {
    let mut timeline = TIMELINE.lock().unwrap();

    // Ring buffer: evict oldest when full
    if timeline.len() >= MAX_SNAPSHOTS {
        timeline.remove(0);
    }

    timeline.push(snapshot);
}

/// Get the full timeline
pub fn get_timeline() -> Timeline {
    let timeline = TIMELINE.lock().unwrap();

    let duration_ms = if timeline.len() >= 2 {
        timeline.last().unwrap().timestamp_ms - timeline.first().unwrap().timestamp_ms
    } else {
        0
    };

    let drift_points: Vec<u64> = timeline
        .iter()
        .filter(|s| s.is_drift_point)
        .map(|s| s.timestamp_ms)
        .collect();

    Timeline {
        total_snapshots: timeline.len(),
        duration_ms,
        drift_points,
        snapshots: timeline.clone(),
    }
}

/// Get a specific snapshot by timestamp
pub fn get_snapshot_at(timestamp_ms: u64) -> Option<StateSnapshot> {
    let timeline = TIMELINE.lock().unwrap();

    // Find closest snapshot to the requested timestamp
    timeline
        .iter()
        .min_by_key(|s| (s.timestamp_ms as i64 - timestamp_ms as i64).unsigned_abs())
        .cloned()
}

/// Detect state drift by comparing consecutive snapshots
/// Returns any variables that changed unexpectedly
pub fn detect_drift() -> Vec<DriftReport> {
    let timeline = TIMELINE.lock().unwrap();
    let mut drifts = Vec::new();

    for window in timeline.windows(2) {
        let prev = &window[0];
        let curr = &window[1];

        for (key, curr_val) in &curr.variables {
            if let Some(prev_val) = prev.variables.get(key) {
                if prev_val != curr_val && curr.is_drift_point {
                    drifts.push(DriftReport {
                        variable: key.clone(),
                        expected: prev_val.clone(),
                        actual: curr_val.clone(),
                        drift_at_ms: curr.timestamp_ms,
                        explanation: format!(
                            "Variable '{}' changed from '{}' to '{}' at T-{}ms. This mutation was flagged as unexpected.",
                            key, prev_val, curr_val, curr.timestamp_ms
                        ),
                    });
                }
            }
        }
    }

    drifts
}

/// Clear the entire timeline (useful when switching debug sessions)
pub fn clear_timeline() {
    let mut timeline = TIMELINE.lock().unwrap();
    timeline.clear();
}
