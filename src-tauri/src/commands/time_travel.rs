//! Tauri commands for Neural Time Travel Debugger
//!
//! Exposes state recording, timeline retrieval, and drift detection
//! to the React frontend's "Time Travel" tab.

use crate::time_travel;
use std::collections::HashMap;

#[tauri::command]
pub fn record_state(
    timestamp_ms: u64,
    label: String,
    variables: HashMap<String, String>,
    callstack: Vec<String>,
    is_drift_point: bool,
) -> Result<String, String> {
    let snapshot = time_travel::StateSnapshot {
        timestamp_ms,
        label,
        variables,
        callstack,
        is_drift_point,
    };

    time_travel::record_snapshot(snapshot);
    Ok("Snapshot recorded".into())
}

#[tauri::command]
pub fn get_timeline() -> Result<time_travel::Timeline, String> {
    Ok(time_travel::get_timeline())
}

#[tauri::command]
pub fn get_snapshot(timestamp_ms: u64) -> Result<Option<time_travel::StateSnapshot>, String> {
    Ok(time_travel::get_snapshot_at(timestamp_ms))
}

#[tauri::command]
pub fn detect_drift() -> Result<Vec<time_travel::DriftReport>, String> {
    Ok(time_travel::detect_drift())
}

#[tauri::command]
pub fn clear_debug_timeline() -> Result<String, String> {
    time_travel::clear_timeline();
    Ok("Timeline cleared".into())
}
