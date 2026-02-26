//! Tauri commands for the SEMAP Actor System
//!
//! Exposes agent spawning, status querying, and task dispatching
//! to the React frontend.

use crate::agents::semap::AgentStatusReport;
use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct SemapAgentInfo {
    pub id: String,
    pub agent_type: String,
    pub state: String,
    pub domain: String,
    pub capabilities: Vec<String>,
}

/// Spawn a SEMAP agent of the given type (frontend, backend, devops).
/// In a production build this would register with the real Orchestrator state.
/// For now we return a mock confirmation for the frontend to consume.
#[tauri::command]
pub fn spawn_semap_agent(agent_type: String) -> Result<SemapAgentInfo, String> {
    let (domain, capabilities) = match agent_type.to_lowercase().as_str() {
        "frontend" => ("frontend", vec![
            "ui_analysis".into(),
            "component_generation".into(),
            "accessibility_audit".into(),
            "auto_fix".into(),
        ]),
        "backend" => ("backend", vec![
            "api_analysis".into(),
            "schema_review".into(),
            "security_scan".into(),
            "auto_fix".into(),
        ]),
        "devops" => ("devops", vec![
            "pipeline_analysis".into(),
            "dockerfile_gen".into(),
            "build_optimization".into(),
            "auto_fix".into(),
        ]),
        _ => return Err(format!("Unknown SEMAP agent type: {}", agent_type)),
    };

    Ok(SemapAgentInfo {
        id: uuid::Uuid::new_v4().to_string(),
        agent_type: agent_type.clone(),
        state: "idle".into(),
        domain: domain.into(),
        capabilities,
    })
}

/// Query the status of currently active SEMAP agents.
#[tauri::command]
pub fn query_semap_status() -> Vec<AgentStatusReport> {
    // In production, this reads from the managed Orchestrator state.
    // For now, return representative mock data matching the frontend UI.
    vec![
        AgentStatusReport {
            agent_type: "FrontendAgent".into(),
            state: "Idle".into(),
            current_task: None,
            completed_tasks: 3,
            auto_fix_count: 1,
        },
        AgentStatusReport {
            agent_type: "BackendAgent".into(),
            state: "Executing".into(),
            current_task: Some("Scanning API endpoints for N+1 queries".into()),
            completed_tasks: 7,
            auto_fix_count: 2,
        },
        AgentStatusReport {
            agent_type: "DevOpsAgent".into(),
            state: "Idle".into(),
            current_task: None,
            completed_tasks: 5,
            auto_fix_count: 0,
        },
    ]
}

/// List all registered SEMAP agent types and their capabilities.
#[tauri::command]
pub fn list_active_agents() -> Vec<SemapAgentInfo> {
    vec![
        SemapAgentInfo {
            id: uuid::Uuid::new_v4().to_string(),
            agent_type: "frontend".into(),
            state: "idle".into(),
            domain: "frontend".into(),
            capabilities: vec!["ui_analysis".into(), "component_generation".into(), "accessibility_audit".into(), "auto_fix".into()],
        },
        SemapAgentInfo {
            id: uuid::Uuid::new_v4().to_string(),
            agent_type: "backend".into(),
            state: "executing".into(),
            domain: "backend".into(),
            capabilities: vec!["api_analysis".into(), "schema_review".into(), "security_scan".into(), "auto_fix".into()],
        },
        SemapAgentInfo {
            id: uuid::Uuid::new_v4().to_string(),
            agent_type: "devops".into(),
            state: "idle".into(),
            domain: "devops".into(),
            capabilities: vec!["pipeline_analysis".into(), "dockerfile_gen".into(), "build_optimization".into(), "auto_fix".into()],
        },
    ]
}
