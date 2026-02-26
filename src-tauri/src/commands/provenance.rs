//! Tauri commands for Code Provenance Blockchain Ledger
//!
//! Exposes provenance recording, querying, and chain verification
//! to the React frontend.

use crate::provenance;

#[tauri::command]
pub fn record_provenance(
    file_path: String,
    start_line: usize,
    end_line: usize,
    origin: String,
    snippet: String,
    author: String,
) -> Result<provenance::ProvenanceBlock, String> {
    let origin_enum = match origin.to_uppercase().as_str() {
        "USER" | "USER_AUTH" | "USER-AUTH" => provenance::CodeOrigin::UserAuth,
        "AI" | "ZYNTA" | "ZYNTA_GEN" | "ZYNTA-GEN" => provenance::CodeOrigin::ZyntaGen,
        "EXTERNAL" | "IMPORT" => provenance::CodeOrigin::ExternalImport,
        "HYBRID" | "MIXED" => provenance::CodeOrigin::HybridEdit,
        _ => return Err(format!("Unknown origin type: {}", origin)),
    };

    Ok(provenance::record_edit(
        &file_path,
        (start_line, end_line),
        origin_enum,
        &snippet,
        &author,
    ))
}

#[tauri::command]
pub fn query_provenance(file_path: String) -> Result<Vec<provenance::ProvenanceBlock>, String> {
    Ok(provenance::query_history(&file_path))
}

#[tauri::command]
pub fn verify_chain() -> Result<provenance::ChainStatus, String> {
    Ok(provenance::verify_chain())
}
