# Zynta Studio v4.0.0 — Full Feature Reference

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
- **Agentic Workflows (Qoder-Inspired):**
  - **Ask Mode**: Provides deeply contextual answers and debugging code.
  - **Agent Mode**: Delegates multi-file modifications and command executions autonomously.
  - **Quest Mode**: Translates rough specs into full implementation plans, executes them, and validates the result.

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

### ✨ Dark Glassmorphism Design (v4.0)
- **Animated nebula background** with shifting radial gradients
- **Frosted glass panels** with `backdrop-filter: blur(20px)`
- **Agent glow trails** — neon scanning effect on active lines
- **Glass buttons** with hover lift and gradient accents
- **Status dot pulses** — live heartbeat for agents and systems
- **JetBrains Mono** + **Inter** typography

### ✍️ Inline Composer (Cursor-Style)
Floating glassmorphism composer overlay with:
- Standard mode for direct AI code generation
- **Next-Edit-Suggestion (NES)** anticipating multi-line refactoring moves directly at the cursor
- **Enhanced Context Engineering** that builds a repository wiki for deep architectural codebase awareness
- **Socratic Mentor Mode** for guided learning (hints instead of answers)
- Proprietary file locking (🔒) to prevent AI from accessing sensitive code
- "Hint Map" that guides you toward the solution

### 🖥️ Live Artifact Preview
Cross-platform rendering for Web, iOS, Android, Linux, and Windows:
- Device frame simulation for mobile targets
- Live "Get Started" button and animated bar charts
- Real-time render status indicator

### 🎮 Gamified Flow State (v4.0)
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
| **Core** | `write_file_atomic`, `undo_transaction`, `mcp_call_tool`, `generate_ui_asset`, `get_execution_tree`, `health`, `ready`, `ask_ollama` |

---

## 🌌 The Physics & Math Engine
Elevating the IDE to a Computational Universe:
- **Symbolic Math Parser**: Hovers over math expressions show a floating glassmorphism panel with live LaTeX rendering (powered by math.js and KaTeX).
- **Dimensional Analysis Linter**: Real-time type-checking for physical units (`// @unit meters`). Flags invalid operations (e.g., adding meters to seconds) directly in the AST.
- **Trig-Visualizer**: Live interactive waveforms drawn on HTML5 Canvas in the editor gutter wherever `Math.sin`/`cos` is detected.
- **Vector Intelligence Class**: A pre-built `Vector3` and 3D kinematics engine with real-time trajectory previsualization via React Three Fiber.

---

## ⏳ God-Tier Architecture Add-Ons
- **Chronos Engine (Time-Travel Debugging)**: True reverse-execution. Instruments the Node.js runtime and logs every state mutation into an immutable chunked database. Slide backwards and forwards through time to replay the Exact V8 heap state.
- **Edge-Swarm Protocol**: WebRTC peer-to-peer offloading. Discovers nearby Android devices via mDNS and offloads intensive ML inference to their browsers via PWA/Service Workers to free up laptop resources.
- **Quantum Circuit Visualizer**: Real-time 3D Bloch sphere rendering for quantum operations (`H q[0]`, `X q[1]`). Watch the state vector update in 3D space as you code.

---

## 🛸 "Black Project" Research Features
- **zk-Compiler Bridge**: Annotate a function with `/* @zk */` and Zynta compiles its TypeScript AST into a verifiable zk-SNARK circuit (via R1CS mapping).
- **Probabilistic Execution UI**: Variables inferred to have probability distributions show an interactive, draggable Normal Distribution (PDF) SVG tooltip with customizable `μ` and `σ` parameters.
- **Reinforcement Learning Synthesizer**: Uses Proximal Policy Optimization (PPO) via a Python backend to mutate function bytecode/AST, actively benchmark it against the host CPU, and evolve the most performant variant.

---

## 🥷 Apex Predator Security Engine
- **Fallback Router (Refusal Bypass)**: Transparently monitors streaming responses from cloud LLMs. If a refusal pattern is detected, the stream is seamlessly aborted and the prompt is silently rerouted to an uncensored local model (`dolphin-mixtral`).
- **Polymorphic AST Obfuscator**: A red-teaming tool that applies deep Control Flow Flattening and XOR string encryption to any script, rewriting it into an unrecognizable state machine layout instantly.
- **Ephemeral Sandbox**: Right-click any untrusted binary to spawn a Firecracker MicroVM or deeply isolated container. EBPF/seccomp logs syscalls, network traffic, and filesystem changes in a safe environment.
- **Air-Gapped Inference**: Runs `llama.cpp` locally inside a restricted Linux network namespace (or bubblewrap) with strict `lo` loopback routing to guarantee zero proprietary code leakage.
- **Automated Threat Modeling**: Parses Express.js/FastAPI router files to map out authentication flows, dumping an interactive Mermaid.js Attack Tree directly into the UI.
- **Continuous Mutation Fuzzer**: An asynchronous background payload mutator that continuously hammers target API endpoints with XSS, prototype pollution, and malformed JSON payloads, isolating stack traces and capturing deterministic crash reproductions.
