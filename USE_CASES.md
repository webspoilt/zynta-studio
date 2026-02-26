# 🛠️ Zynta Studio: Real-World Use Cases

Zynta Studio is more than just an AI code autocomplete extension. Because it acts as both the **Editor** and the **DevOps Orchestrator** with direct access to your machine's native tools, it reshapes entire development pipelines.

Here are three powerful ways developers are using Zynta Studio's native automations today:

---

## 🎯 Use Case 1: The One-Click End-to-End Test (QA Automation)

**The Problem:** You just added a new authentication flow to your React web app. To test it, you normally have to save, open your terminal, run `npm run dev`, open a browser, navigate to the login page, type in credentials, click submit, and check the network tab.

**The Zynta Studio Solution:**
You use the Zynta Runner **Web Panel** directly inside the IDE.

**How it works:**
1. You finish writing the code for `Login.tsx`.
2. In the Zynta Runner panel below the editor, you select the **Web Apps** tab and click **Run & Test**.
3. **Internal Build:** Zynta autonomously runs `npm run build` or your configured dev script in the Agent Terminal.
4. **Auto-Browser Testing:** Upon a successful build, Zynta spins up a headless **Playwright** browser instance in the background.
5. **Generative Navigation:** The AI navigates to your local site, clicks the new "Login" button, and attempts to authenticate. 
6. **Error Highlighting:** If the button throws a hidden React error or a `404`, Zynta catches the exception from Playwright and immediately highlights the exact offending line in `Login.tsx` back in your editor.

---

## 📱 Use Case 2: Autonomous Mobile App Compilation

**The Problem:** Compiling Android apps locally is a nightmare. Setting up Android Studio, configuring Gradle paths, managing JDK versions, and hooking up to an emulator takes hours of frustrating context-switching.

**The Zynta Studio Solution:**
Zynta integrates directly with the Android SDK existing on your host machine.

**How it works:**
1. You make a change to a React Native or Kotlin component.
2. In the Zynta Runner panel, you select the **Android Apps** tab.
3. **Environment Audit:** Zynta's Agent Terminal quickly scans your system for `java` and `gradle`. If missing, the **Terminal Listener** pops up and prompts: *"I see you lack the Android SDK. Should I install it for you?"*
4. **Virtual Device Flow:** Zynta executes `./gradlew assembleDebug`. 
5. Upon success, it uses `ADB (Android Debug Bridge)` to natively install the fresh `.apk` onto your connected physical device or a background emulator, verifying that the app launches without a fatal crash on boot.

---

## 🎨 Use Case 3: Rapid Prototyping & Generative UI

**The Problem:** Generative AI is great at writing UI components, but previewing them requires you to constantly copy-paste the output from a chat window into your files, save, and check the browser.

**The Zynta Studio Solution:**
The **Claude-Inspired Live Artifacts** panel sits side-by-side with your code.

**How it works:**
1. You hit `Cmd+K` to open the **Cursor-Style Composer** over your editor.
2. You type: *"Create a futuristic, dark-mode pricing table with three tiers and a toggle switch for yearly billing."*
3. As the AI Agent writes the React/Tailwind code into your editor, the **Artifact Preview** panel on the right listens to the changes.
4. It dynamically renders the React component *live*. You can click the toggle switch and see the hover effects in the sandbox immediately, ensuring the AI generated exactly what you wanted before you commit the code structure.
