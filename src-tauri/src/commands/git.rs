//! Tauri commands for native Git orchestration
//!
//! Exposes git operations to the React frontend, powering
//! the "Source Control" sidebar panel.

use crate::git;

#[tauri::command]
pub fn git_clone(url: String, dest: String) -> Result<String, String> {
    git::clone_repo(&url, &dest)
}

#[tauri::command]
pub fn git_commit(repo_path: String, message: String) -> Result<String, String> {
    git::commit(&repo_path, &message)
}

#[tauri::command]
pub fn git_pull(repo_path: String) -> Result<String, String> {
    git::pull(&repo_path)
}

#[tauri::command]
pub fn git_push(repo_path: String) -> Result<String, String> {
    git::push(&repo_path)
}

#[tauri::command]
pub fn git_status(repo_path: String) -> Result<Vec<git::GitStatusEntry>, String> {
    git::get_status(&repo_path)
}

#[tauri::command]
pub fn git_log(repo_path: String, count: usize) -> Result<Vec<git::GitLogEntry>, String> {
    git::get_log(&repo_path, count)
}

#[tauri::command]
pub fn git_repo_info(repo_path: String) -> Result<git::GitRepoInfo, String> {
    git::get_repo_info(&repo_path)
}
