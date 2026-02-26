//! True AST Parsing Backend using tree-sitter
//!
//! Parses source files into structured AST nodes and generates
//! Mermaid flowchart diagrams for the "Architecture Vis" tab.

use serde::{Deserialize, Serialize};
use std::collections::HashMap;

// ─────────────────────────────────────────────────────────
//  AST Node Types
// ─────────────────────────────────────────────────────────

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct AstNode {
    pub id: String,
    pub kind: String,        // "function", "class", "import", "variable", etc.
    pub name: String,
    pub start_line: usize,
    pub end_line: usize,
    pub children: Vec<AstNode>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct AstTree {
    pub file_path: String,
    pub language: String,
    pub root_nodes: Vec<AstNode>,
    pub stats: AstStats,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct AstStats {
    pub total_functions: usize,
    pub total_classes: usize,
    pub total_imports: usize,
    pub total_lines: usize,
    pub max_depth: usize,
}

// ─────────────────────────────────────────────────────────
//  Language Detection
// ─────────────────────────────────────────────────────────

fn detect_language(path: &str) -> &str {
    if path.ends_with(".rs") { return "rust"; }
    if path.ends_with(".ts") || path.ends_with(".tsx") { return "typescript"; }
    if path.ends_with(".js") || path.ends_with(".jsx") { return "javascript"; }
    if path.ends_with(".py") { return "python"; }
    if path.ends_with(".go") { return "go"; }
    "unknown"
}

// ─────────────────────────────────────────────────────────
//  Parser (tree-sitter integration point)
// ─────────────────────────────────────────────────────────

/// Parse a source file and return an AST tree.
///
/// NOTE: In a full production build, this would use the `tree-sitter` crate
/// with language-specific grammars. For this iteration, we use a lightweight
/// regex-based heuristic parser that extracts functions, classes, and imports
/// from common languages. The tree-sitter integration point is clearly marked
/// for future drop-in replacement.
pub fn parse_file(path: &str, source: &str) -> AstTree {
    let language = detect_language(path);
    let lines: Vec<&str> = source.lines().collect();
    let mut root_nodes = Vec::new();
    let mut node_counter: usize = 0;

    let mut stats = AstStats {
        total_functions: 0,
        total_classes: 0,
        total_imports: 0,
        total_lines: lines.len(),
        max_depth: 0,
    };

    for (i, line) in lines.iter().enumerate() {
        let trimmed = line.trim();

        // Detect imports
        if trimmed.starts_with("import ") || trimmed.starts_with("use ") || trimmed.starts_with("from ") {
            stats.total_imports += 1;
            node_counter += 1;
            root_nodes.push(AstNode {
                id: format!("node_{}", node_counter),
                kind: "import".into(),
                name: trimmed.to_string(),
                start_line: i + 1,
                end_line: i + 1,
                children: vec![],
            });
        }

        // Detect functions
        let is_fn = match language {
            "rust" => trimmed.starts_with("pub fn ") || trimmed.starts_with("fn ") || trimmed.starts_with("pub async fn ") || trimmed.starts_with("async fn "),
            "typescript" | "javascript" => trimmed.contains("function ") || trimmed.contains("=> {") || (trimmed.starts_with("export") && trimmed.contains("function")),
            "python" => trimmed.starts_with("def ") || trimmed.starts_with("async def "),
            "go" => trimmed.starts_with("func "),
            _ => false,
        };

        if is_fn {
            stats.total_functions += 1;
            node_counter += 1;
            let fn_name = extract_name(trimmed, language, "function");
            root_nodes.push(AstNode {
                id: format!("node_{}", node_counter),
                kind: "function".into(),
                name: fn_name,
                start_line: i + 1,
                end_line: i + 1, // Simplified; full parser would find closing brace
                children: vec![],
            });
        }

        // Detect classes/structs/traits
        let is_class = match language {
            "rust" => trimmed.starts_with("pub struct ") || trimmed.starts_with("struct ") || trimmed.starts_with("pub enum ") || trimmed.starts_with("pub trait ") || trimmed.starts_with("impl "),
            "typescript" | "javascript" => trimmed.contains("class "),
            "python" => trimmed.starts_with("class "),
            "go" => trimmed.starts_with("type ") && trimmed.contains("struct"),
            _ => false,
        };

        if is_class {
            stats.total_classes += 1;
            node_counter += 1;
            let class_name = extract_name(trimmed, language, "class");
            root_nodes.push(AstNode {
                id: format!("node_{}", node_counter),
                kind: "class".into(),
                name: class_name,
                start_line: i + 1,
                end_line: i + 1,
                children: vec![],
            });
        }
    }

    stats.max_depth = if root_nodes.is_empty() { 0 } else { 1 };

    AstTree {
        file_path: path.to_string(),
        language: language.to_string(),
        root_nodes,
        stats,
    }
}

/// Extract a human-readable name from a declaration line
fn extract_name(line: &str, _language: &str, kind: &str) -> String {
    // Simple heuristic: take the second word after the keyword
    let parts: Vec<&str> = line.split_whitespace().collect();
    match kind {
        "function" => {
            for (i, part) in parts.iter().enumerate() {
                if *part == "fn" || *part == "function" || *part == "def" || *part == "func" {
                    if let Some(name) = parts.get(i + 1) {
                        return name.trim_end_matches('(').trim_end_matches('{').trim_end_matches(':').to_string();
                    }
                }
            }
            parts.last().unwrap_or(&"unknown").trim_end_matches('(').to_string()
        }
        "class" => {
            for (i, part) in parts.iter().enumerate() {
                if *part == "struct" || *part == "class" || *part == "enum" || *part == "trait" || *part == "impl" || *part == "type" {
                    if let Some(name) = parts.get(i + 1) {
                        return name.trim_end_matches('{').trim_end_matches(':').trim_end_matches('<').to_string();
                    }
                }
            }
            parts.last().unwrap_or(&"unknown").to_string()
        }
        _ => "unknown".into(),
    }
}

// ─────────────────────────────────────────────────────────
//  Mermaid Flowchart Generation
// ─────────────────────────────────────────────────────────

/// Convert an AST tree into a Mermaid flowchart string
pub fn generate_mermaid(tree: &AstTree) -> String {
    let mut lines = vec![
        "graph TD".to_string(),
        format!("    FILE[\"📄 {}\"]", tree.file_path.split('/').last().unwrap_or(&tree.file_path)),
    ];

    // Group nodes by kind
    let mut imports: Vec<&AstNode> = vec![];
    let mut functions: Vec<&AstNode> = vec![];
    let mut classes: Vec<&AstNode> = vec![];

    for node in &tree.root_nodes {
        match node.kind.as_str() {
            "import" => imports.push(node),
            "function" => functions.push(node),
            "class" => classes.push(node),
            _ => {}
        }
    }

    if !imports.is_empty() {
        lines.push(format!("    IMPORTS[\"📦 Imports ({})\"]", imports.len()));
        lines.push("    FILE --> IMPORTS".into());
    }

    for class in &classes {
        lines.push(format!("    {}[\"🏗 {}\"]", class.id, class.name));
        lines.push(format!("    FILE --> {}", class.id));
    }

    for func in &functions {
        lines.push(format!("    {}[\"⚡ {}()\"]", func.id, func.name));
        // Link functions to their parent class or to FILE
        lines.push(format!("    FILE --> {}", func.id));
    }

    // Stats subgraph
    lines.push("    subgraph Stats".into());
    lines.push(format!("        S1[\"Functions: {}\"]", tree.stats.total_functions));
    lines.push(format!("        S2[\"Classes: {}\"]", tree.stats.total_classes));
    lines.push(format!("        S3[\"Lines: {}\"]", tree.stats.total_lines));
    lines.push("    end".into());

    lines.join("\n")
}
