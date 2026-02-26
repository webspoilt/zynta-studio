import { Terminal, Activity, Cpu, AlertTriangle, Check, X, Smartphone, History, Play, FastForward, Rewind } from 'lucide-react';
import { useState, useEffect } from 'react';

export function AgentTerminal() {
    const [logs, setLogs] = useState<string[]>([]);
    const [showListenerPrompt, setShowListenerPrompt] = useState(false);
    const [activeTab, setActiveTab] = useState<'execution' | 'logcat' | 'time-travel'>('execution');

    useEffect(() => {
        const mockLogs = [
            '[SYSTEM] Initializing Zynta Agentic Engine v4.0...',
            '[SEMAP] FrontendAgent #1 spawned — Domain: ui_analysis',
            '[SEMAP] BackendAgent #2 spawned — Domain: api_analysis',
            '[SEMAP] DevOpsAgent #3 spawned — Domain: pipeline_analysis',
            '[VFS] Snapshot captured: snap_4892_pre_refactor.',
            '[ORCHESTRATOR] Combinatorial auction opened for task "Refactor UI".',
            '[AGENT_1] Executing: Analyzing DOM structure via tree-sitter...',
            '[AGENT_1] Proposal generated: Add ArtifactPreview panel.',
            '[RedTeam] Sandbox execution check passed (0 vulnerabilities).',
            '[PROVENANCE] Block #0 recorded: App.tsx [USER-AUTH] (SHA: a3b8d1..)',
            '[SYSTEM] Awaiting user approval for generated changes...',
            '',
            '> python build_script.py',
            'command not found: python',
            '[AUTO-FIX] Intercepting critical build failure...',
            '[AUTO-FIX] Parsing stack trace → Missing Python interpreter.',
            '[AUTO-FIX] Generating cross-platform fix: winget install python',
            '[AUTO-FIX] Retrying command...',
            '> python build_script.py',
            'Compilation successful. 0 errors, 0 warnings.'
        ];

        let current = 0;
        const interval = setInterval(() => {
            if (current < mockLogs.length) {
                setLogs(prev => [...prev, mockLogs[current]]);
                if (mockLogs[current] === 'command not found: python') {
                    setShowListenerPrompt(true);
                }
                current++;
            } else {
                clearInterval(interval);
            }
        }, 700);

        return () => clearInterval(interval);
    }, []);

    const getLogColor = (log: string) => {
        if (log.includes('[SYSTEM]')) return 'var(--cyan)';
        if (log.includes('[SEMAP]')) return 'var(--violet)';
        if (log.includes('[AGENT_')) return 'var(--accent-hover)';
        if (log.includes('[RedTeam]')) return 'var(--rose)';
        if (log.includes('[VFS]')) return 'var(--amber)';
        if (log.includes('[AUTO-FIX]')) return 'var(--emerald)';
        if (log.includes('[PROVENANCE]')) return '#f0abfc';
        if (log.includes('[ORCHESTRATOR]')) return 'var(--cyan)';
        if (log.startsWith('>')) return 'white';
        if (log.includes('command not found')) return '#ef4444';
        if (log.includes('Compilation successful')) return 'white';
        return 'var(--text-dim)';
    };

    const tabStyle = (tab: string, color: string) => ({
        display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer',
        color: activeTab === tab ? color : 'var(--text-muted)',
        borderBottom: activeTab === tab ? `2px solid ${color}` : '2px solid transparent',
        paddingBottom: '6px', marginBottom: '-9px',
        transition: 'all 0.2s var(--ease-smooth)',
    });

    return (
        <div className="ide-panel" style={{ gridColumn: '2', borderTop: '1px solid var(--border-color)', position: 'relative' }}>
            {/* Terminal Header */}
            <div style={{ display: 'flex', padding: '8px 16px', borderBottom: '1px solid var(--border-color)', fontSize: '12px', gap: '20px', color: 'var(--text-muted)', background: 'rgba(5, 5, 15, 0.4)' }}>
                <div onClick={() => setActiveTab('execution')} style={tabStyle('execution', 'var(--text-main)')}>
                    <Terminal size={14} /> Execution Logs
                </div>
                <div onClick={() => setActiveTab('logcat')} style={tabStyle('logcat', 'var(--emerald)')}>
                    <Smartphone size={14} /> Logcat / ADB
                </div>
                <div onClick={() => setActiveTab('time-travel')} style={tabStyle('time-travel', 'var(--violet)')}>
                    <History size={14} /> Time Travel
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', borderBottom: '2px solid transparent', paddingBottom: '6px', marginBottom: '-9px' }}>
                    <Activity size={14} /> Telemetry
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', borderBottom: '2px solid transparent', paddingBottom: '6px', marginBottom: '-9px' }}>
                    <Cpu size={14} /> Agents (3 Active)
                </div>
                {/* Shadow Agents */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--violet)', fontSize: '11px' }}>
                    <div className="status-dot agent" style={{ width: '6px', height: '6px' }} />
                    Shadow Agents: Reviewing security...
                </div>
                <div style={{ flex: 1 }} />
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--emerald)' }}>
                    <div className="status-dot online" />
                    Engine Online
                </div>
            </div>

            {/* Terminal Body */}
            <div style={{ flex: 1, padding: '12px 16px', fontFamily: '"JetBrains Mono", monospace', fontSize: '13px', overflowY: 'auto' }}>
                {activeTab === 'execution' && logs.map((log, i) => (
                    <div key={i} style={{ marginBottom: '4px', color: getLogColor(log), animation: 'fadeIn 0.2s ease-out' }}>
                        {log !== '' && !log.startsWith('>') && !log.includes('command not found') && (
                            <span style={{ opacity: 0.3, marginRight: '8px', fontSize: '11px' }}>
                                {new Date().toISOString().split('T')[1].substring(0, 8)}
                            </span>
                        )}
                        {log}
                    </div>
                ))}
                {activeTab === 'execution' && logs.length === 20 && (
                    <div style={{ marginTop: '8px', display: 'flex', gap: '8px' }}>
                        <span style={{ color: 'var(--emerald)' }}>❯</span>
                        <span style={{ color: 'white', animation: 'blink 1s infinite' }}>_</span>
                    </div>
                )}

                {activeTab === 'logcat' && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', opacity: 0.8, animation: 'fadeIn 0.3s ease-out' }}>
                        <div style={{ color: 'var(--text-dim)' }}>12-14 10:22:15.123  1024  2048 I SystemServer: Entered the Android system server!</div>
                        <div style={{ color: 'var(--text-dim)' }}>12-14 10:22:15.456  1024  2048 D ActivityManager: Start proc com.zyntastudio.dev for activity</div>
                        <div style={{ color: 'var(--cyan)' }}>12-14 10:22:16.789  4096  4096 V AndroidRuntime: Calling main entry com.zyntastudio.dev.MainActivity</div>
                        <div style={{ color: 'var(--amber)' }}>12-14 10:22:17.001  4096  4096 W Choreographer: Skipped 45 frames!  The application may be doing too much work on its main thread.</div>
                        <div style={{ color: 'var(--emerald)' }}>12-14 10:22:17.555  4096  4096 I ZyntaMobileRunner: React Native / Compose bridge successfully bound.</div>
                        <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
                            <span style={{ color: 'var(--emerald)' }}>❯</span>
                            <span style={{ color: 'white', animation: 'blink 1s infinite' }}>_</span>
                        </div>
                    </div>
                )}

                {activeTab === 'time-travel' && (
                    <div style={{ padding: '8px', display: 'flex', flexDirection: 'column', height: '100%', fontFamily: 'Inter, sans-serif', animation: 'fadeIn 0.3s ease-out' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                            <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--violet)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <History size={16} /> Holographic State Debugger
                            </div>
                            <div style={{ display: 'flex', gap: '8px' }}>
                                <button className="btn-glass" style={{ padding: '6px' }}><Rewind size={14} /></button>
                                <button className="btn-accent" style={{ padding: '6px', background: 'linear-gradient(135deg, var(--violet), #7c3aed)' }}><Play size={14} fill="currentColor" /></button>
                                <button className="btn-glass" style={{ padding: '6px' }}><FastForward size={14} /></button>
                            </div>
                        </div>

                        {/* Scrub Bar */}
                        <div style={{ marginBottom: '24px', position: 'relative', padding: '0 8px' }}>
                            <div style={{ height: '4px', background: 'var(--bg-surface)', borderRadius: '2px', width: '100%' }}>
                                <div style={{ height: '4px', background: 'linear-gradient(90deg, var(--violet), var(--accent))', borderRadius: '2px', width: '45%', boxShadow: '0 0 8px rgba(167, 139, 250, 0.4)' }}></div>
                            </div>
                            <div style={{ position: 'absolute', top: '-4px', left: '45%', width: '12px', height: '12px', background: 'white', border: '2px solid var(--violet)', borderRadius: '50%', transform: 'translateX(-50%)', cursor: 'pointer', boxShadow: '0 0 12px rgba(167, 139, 250, 0.5)' }}></div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--text-muted)', marginTop: '8px', fontWeight: 500 }}>
                                <span>T-0ms (Init)</span>
                                <span style={{ color: 'var(--rose)', fontWeight: 700, transform: 'translateX(-20px)' }}>T-450ms (Drift Detected)</span>
                                <span>T-1000ms</span>
                            </div>
                        </div>

                        {/* Split view */}
                        <div style={{ display: 'flex', gap: '16px', flex: 1, minHeight: 0 }}>
                            <div style={{ flex: 1, background: 'var(--bg-surface)', borderRadius: '10px', border: 'var(--glass-border)', padding: '12px', overflowY: 'auto', backdropFilter: 'blur(8px)' }}>
                                <div style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '12px', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '8px' }}>Memory Snapshot @ T-450ms</div>
                                <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '12px', color: 'var(--text-main)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                    <div><span style={{ color: '#c678dd' }}>const</span> <span style={{ color: '#e5c07b' }}>userSession</span> = <span style={{ color: '#d19a66' }}>null</span>;</div>
                                    <div><span style={{ color: '#c678dd' }}>let</span> <span style={{ color: '#e5c07b' }}>retryCount</span> = <span style={{ color: '#d19a66' }}>3</span>;</div>
                                    <div style={{ background: 'rgba(244, 63, 94, 0.08)', padding: '2px 6px', borderRadius: '6px', borderLeft: '2px solid var(--rose)', margin: '4px -6px' }}><span style={{ color: '#c678dd' }}>let</span> <span style={{ color: '#e5c07b' }}>engineState</span> = <span style={{ color: '#98c379' }}>"RACE_CONDITION"</span>;</div>
                                    <div><span style={{ color: '#c678dd' }}>let</span> <span style={{ color: '#e5c07b' }}>virtualDomSize</span> = <span style={{ color: '#d19a66' }}>24800</span>;</div>
                                </div>
                            </div>

                            <div style={{ flex: 1, background: 'rgba(167, 139, 250, 0.04)', borderRadius: '10px', border: '1px solid rgba(167, 139, 250, 0.12)', padding: '12px', overflowY: 'auto', backdropFilter: 'blur(8px)' }}>
                                <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--violet)', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                    <Activity size={14} /> Drift Analysis
                                </div>
                                <div style={{ fontSize: '12px', color: 'var(--text-muted)', lineHeight: '1.6' }}>
                                    At <strong style={{ color: 'white' }}>T-450ms</strong>, the <code style={{ color: '#e5c07b', fontFamily: '"JetBrains Mono", monospace' }}>engineState</code> variable unexpectedly mutated to <code style={{ color: '#98c379', fontFamily: '"JetBrains Mono", monospace' }}>"RACE_CONDITION"</code>.
                                    <br /><br />
                                    This occurred because the <code style={{ color: '#61afef', fontFamily: '"JetBrains Mono", monospace' }}>OrchestratorAgent</code> fired an async UI hook before <code style={{ color: '#e5c07b', fontFamily: '"JetBrains Mono", monospace' }}>userSession</code> finished resolving its JWT payload.
                                    <br /><br />
                                    <span style={{ display: 'inline-block', background: 'rgba(16, 185, 129, 0.08)', color: 'var(--emerald)', padding: '8px 12px', borderRadius: '8px', border: '1px solid rgba(16, 185, 129, 0.15)', width: '100%', boxSizing: 'border-box', fontSize: '11px' }}>
                                        <strong>Auto-Fix Recommendation:</strong> Wrap the render dispatcher in an <code style={{ color: '#c678dd', fontFamily: '"JetBrains Mono", monospace' }}>await</code> block, or implement a Mutex lock on the VFS layer.
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* TERMINAL LISTENER PROMPT — Glassmorphism */}
            {showListenerPrompt && (
                <div className="listener-toast">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-main)', fontWeight: 600, fontSize: '13px' }}>
                        <AlertTriangle size={16} color="var(--amber)" />
                        Terminal Listener Intercepted Error
                    </div>
                    <div style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: '1.5' }}>
                        <strong>Zynta Assistant:</strong> "I noticed you don't have Python installed to run this project. Would you like me to run <code style={{ color: 'var(--cyan)' }}>winget install python</code> for you?"
                    </div>
                    <div style={{ display: 'flex', gap: '8px', marginTop: '4px' }}>
                        <button onClick={() => setShowListenerPrompt(false)} className="btn-accent" style={{ flex: 1, justifyContent: 'center' }}>
                            <Check size={14} /> Yes, Install
                        </button>
                        <button onClick={() => setShowListenerPrompt(false)} className="btn-glass" style={{ flex: 1, justifyContent: 'center' }}>
                            <X size={14} /> Dismiss
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
