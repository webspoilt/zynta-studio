import { Sparkles, X, Play, Check, FileCode2 } from 'lucide-react';
import { useState } from 'react';
import { RunnerPanel } from './RunnerPanel';

export function EditorArea() {
    const [showComposer, setShowComposer] = useState(true);

    return (
        <div className="ide-panel" style={{ position: 'relative', borderRight: 'none', borderLeft: 'none' }}>
            {/* Editor Tabs */}
            <div style={{ display: 'flex', borderBottom: '1px solid var(--border-color)', background: 'var(--bg-dark)' }}>
                <div style={{ padding: '8px 16px', background: 'var(--bg-panel)', borderRight: '1px solid var(--border-color)', borderTop: '2px solid var(--accent)', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    App.tsx
                    <button style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
                        <X size={12} />
                    </button>
                </div>
            </div>

            {/* Runner Config Block inserted here */}
            <RunnerPanel />

            {/* Code Editor Mock */}
            <div style={{ flex: 1, padding: '16px', fontFamily: '"JetBrains Mono", monospace', fontSize: '14px', lineHeight: '1.6', overflowY: 'auto', color: '#abb2bf' }}>
                <div style={{ display: 'flex' }}><span style={{ color: 'var(--text-muted)', width: '30px', userSelect: 'none' }}>1</span><span style={{ color: '#c678dd' }}>import</span> {'{'} Sidebar {'}'} <span style={{ color: '#c678dd' }}>from</span> <span style={{ color: '#98c379' }}>'./components/Sidebar'</span>;</div>
                <div style={{ display: 'flex' }}><span style={{ color: 'var(--text-muted)', width: '30px', userSelect: 'none' }}>2</span><span style={{ color: '#c678dd' }}>import</span> {'{'} EditorArea {'}'} <span style={{ color: '#c678dd' }}>from</span> <span style={{ color: '#98c379' }}>'./components/EditorArea'</span>;</div>
                <div style={{ display: 'flex' }}><span style={{ color: 'var(--text-muted)', width: '30px', userSelect: 'none' }}>3</span></div>
                <div style={{ display: 'flex' }}><span style={{ color: 'var(--text-muted)', width: '30px', userSelect: 'none' }}>4</span><span style={{ color: '#c678dd' }}>export default function</span> <span style={{ color: '#61afef' }}>App</span>() {'{'}</div>
                <div style={{ display: 'flex' }}><span style={{ color: 'var(--text-muted)', width: '30px', userSelect: 'none' }}>5</span>  <span style={{ color: '#c678dd' }}>return</span> (</div>
                <div style={{ display: 'flex' }}><span style={{ color: 'var(--text-muted)', width: '30px', userSelect: 'none' }}>6</span>    <span style={{ color: '#e06c75' }}>&lt;div</span> <span style={{ color: '#d19a66' }}>className</span>=<span style={{ color: '#98c379' }}>"ide-layout"</span><span style={{ color: '#e06c75' }}>&gt;</span></div>
                <div style={{ display: 'flex', background: 'rgba(99, 102, 241, 0.1)', borderLeft: '3px solid var(--accent)' }}><span style={{ color: 'var(--accent)', width: '27px', userSelect: 'none' }}>7</span>      <span style={{ color: '#e06c75' }}>&lt;Sidebar</span> <span style={{ color: '#e06c75' }}>/&gt;</span></div>
                <div style={{ display: 'flex', background: 'rgba(99, 102, 241, 0.1)', borderLeft: '3px solid var(--accent)' }}><span style={{ color: 'var(--accent)', width: '27px', userSelect: 'none' }}>8</span>      <span style={{ color: '#e06c75' }}>&lt;EditorArea</span> <span style={{ color: '#e06c75' }}>/&gt;</span></div>
                <div style={{ display: 'flex' }}><span style={{ color: 'var(--text-muted)', width: '30px', userSelect: 'none' }}>9</span>    <span style={{ color: '#e06c75' }}>&lt;/div&gt;</span></div>
                <div style={{ display: 'flex' }}><span style={{ color: 'var(--text-muted)', width: '30px', userSelect: 'none' }}>10</span>  );</div>
                <div style={{ display: 'flex' }}><span style={{ color: 'var(--text-muted)', width: '30px', userSelect: 'none' }}>11</span>{'}'}</div>
            </div>

            {/* CURSOR-STYLE COMPOSER MOCKUP */}
            {showComposer && (
                <div style={{
                    position: 'absolute',
                    bottom: '24px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '500px',
                    background: 'var(--bg-surface)',
                    borderRadius: '12px',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.1)',
                    display: 'flex',
                    flexDirection: 'column',
                    overflow: 'hidden',
                    animation: 'fadeInUp 0.3s ease-out'
                }}>
                    <div style={{ padding: '12px 16px', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Sparkles size={16} color="var(--accent)" />
                        <span style={{ fontSize: '13px', fontWeight: 600 }}>Composer</span>
                        <div style={{ flex: 1 }} />
                        <button onClick={() => setShowComposer(false)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
                            <X size={16} />
                        </button>
                    </div>
                    <div style={{ padding: '16px' }}>
                        <div style={{ border: '1px solid var(--accent)', borderRadius: '8px', padding: '12px', background: 'rgba(99, 102, 241, 0.05)', display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <input
                                type="text"
                                placeholder="Ask anything or type '/' for commands..."
                                defaultValue="Add a new cool terminal component at the bottom"
                                style={{ background: 'none', border: 'none', color: 'white', fontSize: '14px', width: '100%', outline: 'none' }}
                            />
                            <button style={{ background: 'var(--accent)', border: 'none', borderRadius: '4px', padding: '6px 12px', color: 'white', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', fontWeight: 600, fontSize: '12px' }}>
                                <Play size={12} /> Run
                            </button>
                        </div>

                        <div style={{ marginTop: '12px', display: 'flex', gap: '8px', fontSize: '12px' }}>
                            <span style={{ background: 'rgba(255,255,255,0.05)', padding: '4px 8px', borderRadius: '4px', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                <FileCode2 size={12} /> App.tsx
                            </span>
                            <span style={{ background: 'rgba(34, 211, 238, 0.1)', color: 'var(--cyan, #22d3ee)', padding: '4px 8px', borderRadius: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                <Check size={12} /> Reference added
                            </span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
