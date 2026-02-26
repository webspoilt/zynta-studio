import { Sparkles, X, Play, Check, FileCode2, Network, GitPullRequestDraft, Lock, GraduationCap, Lightbulb, Zap } from 'lucide-react';
import { useState } from 'react';
import { RunnerPanel } from './RunnerPanel';

export function EditorArea() {
    const [showComposer, setShowComposer] = useState(true);
    const [mentorMode, setMentorMode] = useState(true);
    const [activeEditorTab, setActiveEditorTab] = useState<'code' | 'arch'>('code');

    return (
        <div className="ide-panel" style={{ position: 'relative', borderRight: 'none', borderLeft: 'none' }}>
            {/* Editor Tabs */}
            <div style={{ display: 'flex', borderBottom: '1px solid var(--border-color)', background: 'rgba(5, 5, 15, 0.5)', justifyContent: 'space-between', alignItems: 'center', paddingRight: '16px' }}>
                <div style={{ display: 'flex' }}>
                    <div
                        onClick={() => setActiveEditorTab('code')}
                        className={`editor-tab ${activeEditorTab === 'code' ? 'active' : ''}`}
                        style={{
                            borderTop: activeEditorTab === 'code' ? '2px solid var(--accent)' : '2px solid transparent',
                            background: activeEditorTab === 'code' ? 'var(--bg-panel)' : 'transparent'
                        }}
                    >
                        <FileCode2 size={14} color="var(--accent)" /> App.tsx
                        <span className="provenance-badge user-auth">USER-AUTH</span>
                        <span style={{ color: 'var(--emerald)', display: 'flex', alignItems: 'center' }} title="Proprietary File Locked (Socratic Mode Only)"><Lock size={12} /></span>
                        <button style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', marginLeft: '4px' }}>
                            <X size={12} />
                        </button>
                    </div>
                    <div
                        onClick={() => setActiveEditorTab('arch')}
                        className={`editor-tab ${activeEditorTab === 'arch' ? 'active' : ''}`}
                        style={{
                            borderTop: activeEditorTab === 'arch' ? '2px solid var(--violet)' : '2px solid transparent',
                            background: activeEditorTab === 'arch' ? 'var(--bg-panel)' : 'transparent',
                            color: activeEditorTab === 'arch' ? 'var(--violet)' : 'var(--text-muted)'
                        }}
                    >
                        <Network size={14} /> Architecture Vis
                    </div>
                </div>

                {/* Audit Diff Tool Action */}
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <button className="btn-glass" style={{ fontSize: '11px', padding: '4px 10px' }}>
                        <Zap size={12} color="var(--amber)" /> Flow Mode
                    </button>
                    <button className="btn-glass" style={{ borderColor: 'rgba(99, 102, 241, 0.3)', color: 'var(--accent)' }}>
                        <GitPullRequestDraft size={14} />
                        Review Diff
                    </button>
                </div>
            </div>

            {/* Runner Config Block */}
            <RunnerPanel />

            {/* Code Editor Mock */}
            {activeEditorTab === 'code' && (
                <div style={{ flex: 1, padding: '16px', fontFamily: '"JetBrains Mono", monospace', fontSize: '14px', lineHeight: '1.7', overflowY: 'auto', color: '#abb2bf' }}>
                    <div style={{ display: 'flex' }}><span style={{ color: 'var(--text-dim)', width: '30px', userSelect: 'none', textAlign: 'right', marginRight: '16px' }}>1</span><span style={{ color: '#c678dd' }}>import</span> {'{'} Sidebar {'}'} <span style={{ color: '#c678dd' }}>from</span> <span style={{ color: '#98c379' }}>'./components/Sidebar'</span>;</div>
                    <div style={{ display: 'flex' }}><span style={{ color: 'var(--text-dim)', width: '30px', userSelect: 'none', textAlign: 'right', marginRight: '16px' }}>2</span><span style={{ color: '#c678dd' }}>import</span> {'{'} EditorArea {'}'} <span style={{ color: '#c678dd' }}>from</span> <span style={{ color: '#98c379' }}>'./components/EditorArea'</span>;</div>
                    <div style={{ display: 'flex' }}><span style={{ color: 'var(--text-dim)', width: '30px', userSelect: 'none', textAlign: 'right', marginRight: '16px' }}>3</span></div>
                    <div style={{ display: 'flex' }}><span style={{ color: 'var(--text-dim)', width: '30px', userSelect: 'none', textAlign: 'right', marginRight: '16px' }}>4</span><span style={{ color: '#c678dd' }}>export default function</span> <span style={{ color: '#61afef' }}>App</span>() {'{'}</div>
                    <div style={{ display: 'flex' }}><span style={{ color: 'var(--text-dim)', width: '30px', userSelect: 'none', textAlign: 'right', marginRight: '16px' }}>5</span>  <span style={{ color: '#c678dd' }}>return</span> (</div>
                    <div style={{ display: 'flex' }}><span style={{ color: 'var(--text-dim)', width: '30px', userSelect: 'none', textAlign: 'right', marginRight: '16px' }}>6</span>    <span style={{ color: '#e06c75' }}>&lt;div</span> <span style={{ color: '#d19a66' }}>className</span>=<span style={{ color: '#98c379' }}>"ide-layout"</span><span style={{ color: '#e06c75' }}>&gt;</span></div>
                    {/* Agent Scanning Glow Trail Effect */}
                    <div className="agent-scanning-line" style={{ display: 'flex', background: 'rgba(99, 102, 241, 0.06)', borderRadius: '4px', marginLeft: '-4px', paddingLeft: '4px' }}><span style={{ color: 'var(--accent)', width: '30px', userSelect: 'none', textAlign: 'right', marginRight: '16px', fontWeight: 600 }}>7</span>      <span style={{ color: '#e06c75' }}>&lt;Sidebar</span> <span style={{ color: '#e06c75' }}>/&gt;</span></div>
                    <div className="agent-scanning-line" style={{ display: 'flex', background: 'rgba(99, 102, 241, 0.06)', borderRadius: '4px', marginLeft: '-4px', paddingLeft: '4px' }}><span style={{ color: 'var(--accent)', width: '30px', userSelect: 'none', textAlign: 'right', marginRight: '16px', fontWeight: 600 }}>8</span>      <span style={{ color: '#e06c75' }}>&lt;EditorArea</span> <span style={{ color: '#e06c75' }}>/&gt;</span></div>
                    <div style={{ display: 'flex' }}><span style={{ color: 'var(--text-dim)', width: '30px', userSelect: 'none', textAlign: 'right', marginRight: '16px' }}>9</span>    <span style={{ color: '#e06c75' }}>&lt;/div&gt;</span></div>
                    <div style={{ display: 'flex' }}><span style={{ color: 'var(--text-dim)', width: '30px', userSelect: 'none', textAlign: 'right', marginRight: '16px' }}>10</span>  );</div>
                    <div style={{ display: 'flex' }}><span style={{ color: 'var(--text-dim)', width: '30px', userSelect: 'none', textAlign: 'right', marginRight: '16px' }}>11</span>{'}'}</div>
                </div>
            )}

            {/* Architecture Vis Tab */}
            {activeEditorTab === 'arch' && (
                <div style={{ flex: 1, padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px', overflowY: 'auto' }}>
                    <div style={{ fontSize: '12px', color: 'var(--violet)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Network size={16} /> Live AST — App.tsx (tree-sitter)
                    </div>
                    <div style={{ background: 'var(--bg-surface)', borderRadius: '12px', border: 'var(--glass-border)', padding: '20px', fontFamily: '"JetBrains Mono", monospace', fontSize: '12px', color: 'var(--text-muted)', lineHeight: '1.8' }}>
                        <div style={{ color: 'var(--accent)' }}>graph TD</div>
                        <div>    FILE["📄 App.tsx"]</div>
                        <div>    IMPORTS["📦 Imports (2)"]</div>
                        <div>    FILE --{'>'} IMPORTS</div>
                        <div>    node_1["⚡ App()"]</div>
                        <div>    FILE --{'>'} node_1</div>
                        <div style={{ color: 'var(--text-dim)' }}>    subgraph Stats</div>
                        <div style={{ color: 'var(--text-dim)' }}>        S1["Functions: 1"]</div>
                        <div style={{ color: 'var(--text-dim)' }}>        S2["Classes: 0"]</div>
                        <div style={{ color: 'var(--text-dim)' }}>        S3["Lines: 11"]</div>
                        <div style={{ color: 'var(--text-dim)' }}>    end</div>
                    </div>
                    <div style={{ fontSize: '11px', color: 'var(--text-dim)' }}>
                        ⚡ Powered by <span style={{ color: 'var(--emerald)' }}>tree-sitter</span> native Rust parser • Updates live as you type
                    </div>
                </div>
            )}

            {/* CURSOR-STYLE COMPOSER MOCKUP — Glassmorphism */}
            {showComposer && (
                <div className="composer-overlay">
                    <div style={{ padding: '12px 16px', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Sparkles size={16} color={mentorMode ? "var(--emerald)" : "var(--accent)"} />
                        <span style={{ fontSize: '13px', fontWeight: 600 }}>Composer {mentorMode && <span style={{ color: 'var(--emerald)', fontWeight: 'normal', fontSize: '11px', marginLeft: '6px' }}>(Socratic Mentor Mode)</span>}</span>
                        <div style={{ flex: 1 }} />
                        <button onClick={() => setMentorMode(!mentorMode)} className="btn-glass" style={{ background: mentorMode ? 'rgba(16, 185, 129, 0.1)' : 'transparent', borderColor: mentorMode ? 'rgba(16, 185, 129, 0.3)' : 'transparent', color: mentorMode ? 'var(--emerald)' : 'var(--text-muted)', padding: '4px 8px', fontSize: '11px' }}>
                            <GraduationCap size={14} /> Mentor
                        </button>
                        <button onClick={() => setShowComposer(false)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
                            <X size={16} />
                        </button>
                    </div>
                    <div style={{ padding: '16px' }}>
                        <div style={{ border: mentorMode ? '1px solid rgba(16, 185, 129, 0.3)' : '1px solid rgba(99, 102, 241, 0.3)', borderRadius: '10px', padding: '12px', background: mentorMode ? 'rgba(16, 185, 129, 0.04)' : 'rgba(99, 102, 241, 0.04)', display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <input
                                type="text"
                                placeholder={mentorMode ? "What edge cases am I missing here?" : "Ask anything or type '/' for commands..."}
                                defaultValue={mentorMode ? "Why is this crashing on startup?" : "Add a new cool terminal component at the bottom"}
                                style={{ background: 'none', border: 'none', color: 'white', fontSize: '14px', width: '100%', outline: 'none' }}
                            />
                            <button className="btn-accent" style={{ whiteSpace: 'nowrap', ...(mentorMode ? { background: 'linear-gradient(135deg, var(--emerald), #059669)' } : {}) }}>
                                {mentorMode ? <Lightbulb size={12} /> : <Play size={12} />} {mentorMode ? "Get Hint" : "Run"}
                            </button>
                        </div>

                        <div style={{ marginTop: '12px', display: 'flex', gap: '8px', fontSize: '12px' }}>
                            <span className="btn-glass" style={{ padding: '4px 8px', cursor: 'default' }}>
                                <FileCode2 size={12} /> App.tsx {mentorMode && <Lock size={10} color="var(--emerald)" />}
                            </span>
                            <span style={{ background: 'rgba(34, 211, 238, 0.08)', color: 'var(--cyan)', padding: '4px 8px', borderRadius: '6px', display: 'flex', alignItems: 'center', gap: '4px', border: '1px solid rgba(34, 211, 238, 0.15)' }}>
                                <Check size={12} /> Reference added
                            </span>
                        </div>

                        {/* Mentor Hint Map Mock */}
                        {mentorMode && (
                            <div style={{ marginTop: '16px', background: 'rgba(16, 185, 129, 0.04)', border: '1px solid rgba(16, 185, 129, 0.15)', borderRadius: '10px', padding: '14px', animation: 'fadeInUp 0.3s var(--spring-fast)' }}>
                                <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--emerald)', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                    <Lightbulb size={14} /> Socratic Hint Map
                                </div>
                                <div style={{ fontSize: '12px', color: 'var(--text-muted)', lineHeight: '1.6' }}>
                                    I see a potential race condition in your initialization logic. Instead of giving you the exact code, consider:
                                    <ul style={{ paddingLeft: '20px', marginTop: '8px', color: 'var(--text-main)', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                                        <li>How do you handle concurrent writes in <span style={{ color: '#c678dd', fontFamily: '"JetBrains Mono", monospace' }}>src/App.tsx line 42</span>?</li>
                                        <li>Are you waiting for the VFS to be ready before calling the React DOM render?</li>
                                    </ul>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
