use regex::Regex;
use std::collections::HashMap;
use std::sync::Mutex;
use lazy_static::lazy_static;

lazy_static! {
    /// Global Registry of original secret values to synthetic placeholders
    /// This ensures we can re-hydrate the AI response back to user-code.
    static ref REDACTION_MAP: Mutex<HashMap<String, String>> = Mutex::new(HashMap::new());
}

/// A lightweight, regex-based PII and Secrets scrubber
/// This script intercepts code BEFORE it goes to any LLM (Local or Remote)
pub struct RedactionEngine;

impl RedactionEngine {
    /// Scans a file string, extracts sensitive components, replaces them with placeholders
    pub fn redact_code(source: &str) -> String {
        let mut map = REDACTION_MAP.lock().unwrap();
        let mut scrubbed_code = source.to_string();

        // 1. Redact API Keys (e.g., sk-..., AIza...)
        let api_regex = Regex::new(r#"(?i)(key|secret|token|password)['"]?\s*[:=]\s*['"]([a-zA-Z0-9_\-]{16,})['"]"#).unwrap();
        
        for cap in api_regex.captures_iter(source) {
            let full_match = &cap[0];     // The entire string e.g. apiKey="sk-123456789"
            let secret_val = &cap[2];     // The actual key sk-123456789
            
            let synthetic_id = format!("SYNTHETIC_API_KEY_{}", map.len());
            
            // Store the mapping for later Re-Hydration
            map.insert(synthetic_id.clone(), secret_val.to_string());
            
            // Replace the key in the code while keeping the variable wrapper
            let redacted_match = full_match.replace(secret_val, &synthetic_id);
            scrubbed_code = scrubbed_code.replace(full_match, &redacted_match);
        }

        // 2. Redact IP Addresses
        let ip_regex = Regex::new(r#"\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b"#).unwrap();
        for cap in ip_regex.captures_iter(&scrubbed_code.clone()) {
            let ip_val = &cap[0];
            // Skip localhost
            if ip_val == "127.0.0.1" || ip_val == "0.0.0.0" {
                continue;
            }
            
            let synthetic_id = format!("SYNTHETIC_IP_{}", map.len());
            map.insert(synthetic_id.clone(), ip_val.to_string());
            
            scrubbed_code = scrubbed_code.replace(ip_val, &synthetic_id);
        }

        scrubbed_code
    }

    /// Takes the AI-generated code (which contains synthetic variables) 
    /// and swaps the real proprietary values back in before putting it in the Editor.
    pub fn rehydrate_code(ai_response: &str) -> String {
        let map = REDACTION_MAP.lock().unwrap();
        let mut final_code = ai_response.to_string();

        for (synthetic, real_secret) in map.iter() {
            final_code = final_code.replace(synthetic, real_secret);
        }

        final_code
    }
    
    /// Clears the redaction map (useful when switching workspaces to prevent memory leaks)
    pub fn clear_vault() {
        let mut map = REDACTION_MAP.lock().unwrap();
        map.clear();
    }
}
