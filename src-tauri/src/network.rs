use std::process::Command;
use serde::Serialize;
use tracing::error;

#[derive(Serialize)]
pub struct NetworkProfile {
    pub active_tcp_connections: String,
    pub is_ghost_mode_active: bool,
    pub hardware_vram_gb: f32, // Mocked detection for now
}

/// A highly lightweight network checker
/// In a production environment, this would use a native crate like `sysinfo` or `pnet`
/// Since we are running on Windows/Linux, we can execute a quick `netstat` and count established connections.
pub fn get_network_health() -> NetworkProfile {
    let mut tcp_count = 0;

    #[cfg(target_os = "windows")]
    {
        if let Ok(output) = Command::new("netstat").arg("-ano").output() {
            let stdout = String::from_utf8_lossy(&output.stdout);
            tcp_count = stdout.lines().filter(|line| line.contains("ESTABLISHED")).count();
        } else {
            error!("Failed to run netstat on Windows");
        }
    }

    #[cfg(not(target_os = "windows"))]
    {
        if let Ok(output) = Command::new("netstat").arg("-tn").output() {
            let stdout = String::from_utf8_lossy(&output.stdout);
            tcp_count = stdout.lines().filter(|line| line.contains("ESTABLISHED")).count();
        } else {
            error!("Failed to run netstat on Unix");
        }
    }

    NetworkProfile {
        active_tcp_connections: tcp_count.to_string(),
        is_ghost_mode_active: true, // Mocked for UI toggle
        hardware_vram_gb: 4.2, // Mocked VRAM usage of Llama 3 8B
    }
}
