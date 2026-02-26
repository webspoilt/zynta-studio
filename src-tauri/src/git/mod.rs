//! Native Git Orchestration via git2
//!
//! Provides repository management (clone, commit, pull, push, status, log)
//! without requiring a system terminal.

use serde::{Deserialize, Serialize};
use std::path::Path;
use tracing::{info, error};

// ─────────────────────────────────────────────────────────
//  Data Types
// ─────────────────────────────────────────────────────────

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct GitStatusEntry {
    pub path: String,
    pub status: String, // "modified", "new", "deleted", "renamed"
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct GitLogEntry {
    pub hash: String,
    pub author: String,
    pub date: String,
    pub message: String,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct GitRepoInfo {
    pub path: String,
    pub branch: String,
    pub remote_url: Option<String>,
    pub is_clean: bool,
    pub ahead: usize,
    pub behind: usize,
}

// ─────────────────────────────────────────────────────────
//  Git Operations
//
//  NOTE: In a production build, these functions would use the
//  `git2` crate for native libgit2 bindings. For this iteration,
//  we use `std::process::Command` to call the system git binary,
//  which works universally and avoids complex libgit2 linking.
//  The git2 integration points are marked for future drop-in.
// ─────────────────────────────────────────────────────────

/// Clone a remote repository to a local path
pub fn clone_repo(url: &str, dest: &str) -> Result<String, String> {
    info!("[Git] Cloning {} -> {}", url, dest);

    let output = std::process::Command::new("git")
        .args(["clone", url, dest])
        .output()
        .map_err(|e| format!("Failed to execute git clone: {}", e))?;

    if output.status.success() {
        Ok(format!("Successfully cloned {} to {}", url, dest))
    } else {
        let stderr = String::from_utf8_lossy(&output.stderr);
        error!("[Git] Clone failed: {}", stderr);
        Err(format!("git clone failed: {}", stderr))
    }
}

/// Stage all changes and create a commit
pub fn commit(repo_path: &str, message: &str) -> Result<String, String> {
    info!("[Git] Committing in {} with message: {}", repo_path, message);

    // Stage all
    let add = std::process::Command::new("git")
        .args(["add", "-A"])
        .current_dir(repo_path)
        .output()
        .map_err(|e| format!("git add failed: {}", e))?;

    if !add.status.success() {
        return Err(format!("git add failed: {}", String::from_utf8_lossy(&add.stderr)));
    }

    // Commit
    let commit = std::process::Command::new("git")
        .args(["commit", "-m", message])
        .current_dir(repo_path)
        .output()
        .map_err(|e| format!("git commit failed: {}", e))?;

    if commit.status.success() {
        Ok(String::from_utf8_lossy(&commit.stdout).to_string())
    } else {
        Err(format!("git commit failed: {}", String::from_utf8_lossy(&commit.stderr)))
    }
}

/// Pull latest changes from remote
pub fn pull(repo_path: &str) -> Result<String, String> {
    info!("[Git] Pulling in {}", repo_path);

    let output = std::process::Command::new("git")
        .args(["pull", "--rebase"])
        .current_dir(repo_path)
        .output()
        .map_err(|e| format!("git pull failed: {}", e))?;

    if output.status.success() {
        Ok(String::from_utf8_lossy(&output.stdout).to_string())
    } else {
        Err(format!("git pull failed: {}", String::from_utf8_lossy(&output.stderr)))
    }
}

/// Push local commits to remote
pub fn push(repo_path: &str) -> Result<String, String> {
    info!("[Git] Pushing from {}", repo_path);

    let output = std::process::Command::new("git")
        .args(["push"])
        .current_dir(repo_path)
        .output()
        .map_err(|e| format!("git push failed: {}", e))?;

    if output.status.success() {
        Ok("Push successful".into())
    } else {
        Err(format!("git push failed: {}", String::from_utf8_lossy(&output.stderr)))
    }
}

/// Get the status of a repository
pub fn get_status(repo_path: &str) -> Result<Vec<GitStatusEntry>, String> {
    let output = std::process::Command::new("git")
        .args(["status", "--porcelain"])
        .current_dir(repo_path)
        .output()
        .map_err(|e| format!("git status failed: {}", e))?;

    if !output.status.success() {
        return Err(format!("git status failed: {}", String::from_utf8_lossy(&output.stderr)));
    }

    let stdout = String::from_utf8_lossy(&output.stdout);
    let entries: Vec<GitStatusEntry> = stdout
        .lines()
        .filter(|l| !l.is_empty())
        .map(|line| {
            let status_code = &line[..2];
            let file_path = line[3..].to_string();
            let status = match status_code.trim() {
                "M" => "modified",
                "A" | "??" => "new",
                "D" => "deleted",
                "R" => "renamed",
                _ => "unknown",
            };
            GitStatusEntry {
                path: file_path,
                status: status.into(),
            }
        })
        .collect();

    Ok(entries)
}

/// Get the git log for a repository
pub fn get_log(repo_path: &str, count: usize) -> Result<Vec<GitLogEntry>, String> {
    let output = std::process::Command::new("git")
        .args(["log", &format!("-{}", count), "--pretty=format:%H|%an|%ai|%s"])
        .current_dir(repo_path)
        .output()
        .map_err(|e| format!("git log failed: {}", e))?;

    if !output.status.success() {
        return Err(format!("git log failed: {}", String::from_utf8_lossy(&output.stderr)));
    }

    let stdout = String::from_utf8_lossy(&output.stdout);
    let entries: Vec<GitLogEntry> = stdout
        .lines()
        .filter(|l| !l.is_empty())
        .map(|line| {
            let parts: Vec<&str> = line.splitn(4, '|').collect();
            GitLogEntry {
                hash: parts.first().unwrap_or(&"").to_string(),
                author: parts.get(1).unwrap_or(&"").to_string(),
                date: parts.get(2).unwrap_or(&"").to_string(),
                message: parts.get(3).unwrap_or(&"").to_string(),
            }
        })
        .collect();

    Ok(entries)
}

/// Get repository info (branch, remote, dirty state)
pub fn get_repo_info(repo_path: &str) -> Result<GitRepoInfo, String> {
    // Current branch
    let branch_out = std::process::Command::new("git")
        .args(["rev-parse", "--abbrev-ref", "HEAD"])
        .current_dir(repo_path)
        .output()
        .map_err(|e| format!("Failed to get branch: {}", e))?;

    let branch = String::from_utf8_lossy(&branch_out.stdout).trim().to_string();

    // Remote URL
    let remote_out = std::process::Command::new("git")
        .args(["remote", "get-url", "origin"])
        .current_dir(repo_path)
        .output();

    let remote_url = remote_out.ok()
        .filter(|o| o.status.success())
        .map(|o| String::from_utf8_lossy(&o.stdout).trim().to_string());

    // Is clean?
    let status = get_status(repo_path)?;
    let is_clean = status.is_empty();

    Ok(GitRepoInfo {
        path: repo_path.to_string(),
        branch,
        remote_url,
        is_clean,
        ahead: 0,  // Would require rev-list comparison
        behind: 0,
    })
}
