# 🚀 Zynta Studio: 24/7 Deployment & Build Guide

This guide will walk you through exactly how to set up the Zynta Studio Agentic IDE on your local machine, and how to package it into a highly performant, standalone `.exe` native application for Windows using **Tauri**.

---

## Prerequisites

Before building Zynta Studio, you must ensure your development environment is fully prepared for Tauri (which utilizes Rust for the backend and native bindings).

1. **Node.js:** Ensure you have Node.js (v16+) installed.
2. **Rust Toolchain:** 
   - Download and run `rustup-init.exe` from [rustup.rs](https://rustup.rs/).
   - Follow the default installation prompts.
3. **C++ Build Tools (Windows Only):**
   - Install the **Visual Studio 2022 Build Tools**.
   - Make sure to check the box for "Desktop development with C++" during installation.

---

## Development Setup

1. **Clone the Repository**
   ```bash
   git clone https://github.com/webspoilt/zynta-studio.git
   cd zynta-studio
   ```

2. **Install Frontend Dependencies**
   Zynta Studio's generative UI is built on a lightning-fast React/Vite stack.
   ```bash
   npm install
   ```

3. **Run the IDE in Development Mode**
   To see live updates as you hack on the IDE's source code:
   ```bash
   npm run tauri dev
   ```
   *Note: On first run, cargo will take several minutes to compile the Rust native backend dependencies. Subsequent runs will be nearly instant.*

---

## Packaging into a Native Application (The `.exe` Builder)

One of Zynta Studio's greatest strengths is its ability to compile complex Electron-like applications into impossibly small, performant native executables via Tauri.

When you are ready to distribute or permanently install Zynta Studio, you can bundle it into a `.exe` installer.

1. **Execute the Build Command**
   In the root of the project, run:
   ```bash
   npm run tauri build
   ```

2. **Wait for Compilation**
   The Tauri bundler will:
   - Run a production Vite build (`npm run build`) to minify your React frontend into the `dist/` directory.
   - Cross-compile the Rust backend in `release` mode for maximum performance.
   - Package the assets into an NSIS installer.

3. **Locate your Executable**
   Once compilation is finished (usually takes 3-5 minutes on a modern CPU), your brand-new IDE executable will be waiting for you inside:
   ```text
   src-tauri/target/release/bundle/nsis/zynta-studio_0.1.0_x64-setup.exe
   ```

You can now share this installer or run it to formally install Zynta Studio on your Windows machine!
