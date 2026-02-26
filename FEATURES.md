# Zynta Studio - High-Level Capabilities

Zynta Studio moves beyond traditional IDEs by deeply integrating Large Language Model paradigms into the very fabric of the editing experience.

## ✨ Cursor-Style Composer & Editing
We've brought the speed and context-awareness of the best AI editors directly into Zynta.
- **Inline Editing:** Highlight code and press `Cmd+K` to open a floating composer widget.
- **Context Retrieval:** The orchestrator retrieves context from your entire codebase before passing instructions to the LLM.

## 🖥️ Claude-Style Artifact Previews
No more switching to a browser to see if your generative UI code works.
- **Split Pane:** The right panel dynamically renders UI elements, React components, and HTML snippets in real time.
- **Interactive:** The rendered sandbox allows you to click and interact with the generative UI to confirm functionality.

## 🚀 Zynta Runner - Native DevOps Automations
Zynta acts as both Editor and Orchestrator. By hooking directly into your system's native tools, it automates testing pipelines that normally require massive external infrastructure.

### The Auto-Browser Test (Web Apps)
- Uses **Playwright** behind the scenes.
- Executes `npm run build` internally.
- Visits your local dev server, clicks all interactive elements, and identifies broken buttons or 404s, highlighting the exact offending line in your Editor.

### The Virtual Device Flow (Android Apps)
- Integrates with your host machine's Java/Gradle toolchains.
- Executes `./gradlew assembleDebug` to build an APK.
- Links to physical or virtual devices via `ADB (Android Debug Bridge)` to confirm the app doesn't crash on boot.

### The EXE Builder (Windows Apps)
- Interfaces with **PyInstaller** or **Inno Setup**.
- Packages your scripts into silent `.exe` installers.
- Tests the installation in a hidden directory to ensure missing DLLs are flagged before distribution.

## 💡 The Intelligent "Terminal Listener"
Zynta continuously monitors its internal execution logs. If a build fails due to a missing environmental dependency:
- *Terminal Output:* `command not found: python`
- *Zynta Interception:* Triggers a UI modal: "I noticed Python is missing. Would you like me to run `winget install python` for you?"
