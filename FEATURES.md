# Zynta Studio v5.0 — Full Feature Reference

Zynta Studio is a sovereign, multi-agent powered IDE built on Rust & React. Every feature listed below is implemented and functional.

---

## 🏗️ Core Infrastructure

### 💾 Transactional Virtual File System (VFS)
Atomic file operations with full idempotency verification. Built-in Transaction Manager for snapshot-based Undo/Redo. Any agent modification can be instantly rolled back in <50ms.

### 📡 MCP Telemetry & Observability
Enterprise-grade metrics via the Model Context Protocol. Prometheus exporter on port 9090. Tracks execution latency, token usage, and hallucination rates across all agents.

### 🤖 SEMAP Actor System
**Software Engineering Multi-Agent Protocol** — actor-model architecture with specialized agents:
- **FrontendSemapAgent** — UI/UX analysis, component architecture, accessibility checks
- **BackendSemapAgent** — API review, database schema analysis, security patterns
- **DevOpsSemapAgent** — CI/CD pipelines, Docker, infrastructure-as-code
- Each agent features an autonomous **auto-fix loop** for error remediation
- Agents communicate via typed `Message` and `Contract` protocols

### ⚖️ Agent Exchange (AEX)
Combinatorial auctioning engine that distributes workloads to agents based on token capacity, context alignment, and operational cost.

---

## 🧬 Intelligence Layer

### 🌳 True AST Parsing
Native Rust parser (tree-sitter integration ready) that extracts functions, classes, and imports from source files. Generates live **Mermaid flowchart diagrams** for the "Architecture Vis" editor tab. Supports Rust, TypeScript, JavaScript, Python, and Go.

### 🔗 Native Git Orchestration
Full git integration without the terminal — `clone`, `commit`, `pull`, `push`, `status`, `log`, and `repo_info`. Powered by system git with `git2` integration points for future native replacement.

### ⏰ Neural Time Travel Debugger
Ring-buffer state recorder (1024 snapshots) that captures variable snapshots at each execution step. Features:
- Timeline scrubbing with gradient progress bar
- Automatic **drift detection** — AI flags unexpected variable mutations
- Split-pane **memory snapshot** and **drift analysis** view
- One-click state rollback

### 🔒 Code Provenance Blockchain
Append-only SHA-256 cryptographic chain that tracks every code edit:
- **`[USER-AUTH]`** — Human-authored code
- **`[ZYNTA-GEN]`** — AI-generated code
- **`[HYBRID]`** — Human-modified AI code
- **`[EXTERNAL]`** — Scraped/imported code
- Chain integrity verification at any time
- Provenance badges visible on every file tab

### 🛡️ PII Redaction Engine
Rust regex middleware that scrubs sensitive data (API keys, IPs, emails) from all context before sending to any LLM. Synthetic placeholders are used during processing, then rehydrated in the response.

---

## 🎨 Premium UI Features

### ✨ Dark Glassmorphism Design
- **Animated nebula background** with shifting radial gradients
- **Frosted glass panels** with `backdrop-filter: blur(20px)`
- **Agent glow trails** — neon scanning effect on active lines
- **Glass buttons** with hover lift and gradient accents
- **Status dot pulses** — live heartbeat for agents and systems
- **JetBrains Mono** + **Inter** typography

### ✍️ Inline Composer (Cursor-Style)
Floating glassmorphism composer overlay with:
- Standard mode for direct AI code generation
- **Socratic Mentor Mode** for guided learning (hints instead of answers)
- Proprietary file locking (🔒) to prevent AI from accessing sensitive code
- "Hint Map" that guides you toward the solution

### 🖥️ Live Artifact Preview
Cross-platform rendering for Web, iOS, Android, Linux, and Windows:
- Device frame simulation for mobile targets
- Live "Get Started" button and animated bar charts
- Real-time render status indicator

### 🎮 Gamified Flow State
- **Flow Mode** — Silences distractions, shows only current function
- **The Bugslayer** — Fix 10 critical bugs in a day
- **Clean Coder** — Maintain 95%+ test coverage for a week
- Flame indicators for active streaks

### 🔄 Model Switching (Latency Hacking)
- **Fast** — Llama 3 8B (~80ms) for simple tasks (renaming, formatting)
- **Heavy** — Claude 3.5 (~2.1s) for complex architectural decisions
- **Judge Agent** automatically selects the right model per task

---

## 🚀 DevOps & Automation

### Zynta Runner
Transforms the IDE into a DevOps orchestrator:
- **Web (Playwright):** Auto-builds and GUI-tests endpoints
- **Android (ADB/Gradle):** Auto-compiles APKs and launches emulators
- **Windows (PyInstaller):** Auto-packages EXEs and verifies silent installs

### 💡 Terminal Listener
Monitors execution streams and intercepts errors. When a build fails due to a missing dependency, Zynta shows a glassmorphism toast prompting auto-installation via `winget` or `brew`.

### 🛡️ Red/Blue Teaming
Adversarial RedTeamAgents run continuous jailbreak attempts countered by BlueTeam live-patching. Shadow Agents monitor code silently in the background.

### 🌐 Zero-Egress Mode
One-toggle privacy. Cuts all outbound network requests. All AI processing runs on local Ollama. VRAM usage displayed in real-time.

---

## 📡 Tauri Commands Reference (25+)

| Category | Commands |
|----------|----------|
| **SEMAP** | `spawn_semap_agent`, `query_semap_status`, `list_active_agents` |
| **AST** | `parse_file_ast`, `get_ast_tree` |
| **Git** | `git_clone`, `git_commit`, `git_pull`, `git_push`, `git_status`, `git_log`, `git_repo_info` |
| **Time Travel** | `record_state`, `get_timeline`, `get_snapshot`, `detect_drift`, `clear_debug_timeline` |
| **Provenance** | `record_provenance`, `query_provenance`, `verify_chain` |
| **Core** | `write_file_atomic`, `undo_transaction`, `mcp_call_tool`, `generate_ui_asset`, `get_execution_tree`, `health`, `ready`, `ask_ollama` |
