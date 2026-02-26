import { RefreshCw, Monitor, Download, Maximize2 } from 'lucide-react';

export function ArtifactPreview() {
    return (
        <div className="ide-panel" style={{ gridRow: '1 / span 2', borderLeft: '1px solid var(--border-color)' }}>
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', borderBottom: '1px solid var(--border-color)', background: 'var(--bg-surface)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', fontWeight: 600 }}>
                    <Monitor size={16} color="var(--cyan, #22d3ee)" />
                    Live Preview
                </div>
                <div style={{ display: 'flex', gap: '12px' }}>
                    <button style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }} title="Refresh">
                        <RefreshCw size={14} />
                    </button>
                    <button style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }} title="Download Asset">
                        <Download size={14} />
                    </button>
                    <button style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }} title="Fullscreen">
                        <Maximize2 size={14} />
                    </button>
                </div>
            </div>

            {/* Claude-style Artifact Canvas */}
            <div style={{ flex: 1, backgroundColor: '#ffffff', color: '#000000', display: 'flex', flexDirection: 'column', padding: '16px', overflowY: 'auto' }}>
                <div style={{
                    border: '1px dashed #ccc',
                    borderRadius: '12px',
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'linear-gradient(to bottom right, #f8fafc, #e2e8f0)',
                    position: 'relative'
                }}>
                    {/* Generative UI Mock */}
                    <div style={{ background: 'white', padding: '32px', borderRadius: '16px', boxShadow: '0 20px 40px rgba(0,0,0,0.1)', width: '80%', textAlign: 'center' }}>
                        <div style={{ width: '48px', height: '48px', background: 'var(--accent)', borderRadius: '12px', margin: '0 auto 16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Sparkles size={24} color="white" />
                        </div>
                        <h3 style={{ fontSize: '20px', fontWeight: 800, marginBottom: '8px' }}>GenUI Scaffold</h3>
                        <p style={{ color: '#64748b', fontSize: '14px', marginBottom: '24px' }}>
                            This component was generated dynamically by the VisualLogicTree engine.
                        </p>
                        <button style={{ background: '#0f172a', color: 'white', border: 'none', padding: '10px 24px', borderRadius: '8px', fontWeight: 600, cursor: 'pointer' }}>
                            Interactive Button
                        </button>
                    </div>

                    <div style={{ position: 'absolute', bottom: '16px', right: '16px', background: 'rgba(0,0,0,0.7)', color: 'white', padding: '4px 8px', borderRadius: '4px', fontSize: '11px', fontFamily: 'monospace' }}>
                        Rendered in 42ms
                    </div>
                </div>
            </div>
        </div>
    );
}

// Simple internal icon so we don't need excessive imports
function Sparkles({ size, color }: { size: number, color: string }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a4.5 4.5 0 0 1 0-8.962L8.5 1.937A2 2 0 0 0 9.937.5l1.582-6.135a4.5 4.5 0 0 1 8.962 0L22.063 8.5A2 2 0 0 0 23.5 9.937l6.135 1.582a4.5 4.5 0 0 1 0 8.962l-6.135 1.582a2 2 0 0 0-1.437 1.437l-1.582 6.135a4.5 4.5 0 0 1-8.962 0z" />
        </svg>
    )
}
