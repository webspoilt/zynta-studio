import { RefreshCw, Monitor, Download, Maximize2, Smartphone, MonitorSmartphone, LayoutTemplate, Globe, Laptop } from 'lucide-react';
import { useState } from 'react';

export function ArtifactPreview() {
    const [platform, setPlatform] = useState<'web' | 'ios' | 'android' | 'linux' | 'windows'>('web');

    const platformTab = (p: string, icon: React.ReactNode, label: string, color: string) => (
        <button
            onClick={() => setPlatform(p as any)}
            className={platform === p ? 'btn-accent' : 'btn-glass'}
            style={{
                padding: '4px 8px', fontSize: '11px',
                ...(platform === p ? { background: `linear-gradient(135deg, ${color}, ${color}dd)`, boxShadow: `0 2px 8px ${color}40` } : {})
            }}
        >
            {icon} {label}
        </button>
    );

    return (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            {/* Header */}
            <div style={{ display: 'flex', padding: '10px 14px', borderBottom: '1px solid var(--border-color)', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(5, 5, 15, 0.4)' }}>
                <div style={{ fontSize: '12px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <LayoutTemplate size={14} color="var(--accent)" />
                    Generative UI Preview
                </div>
                <div style={{ display: 'flex', gap: '6px' }}>
                    <button className="btn-glass" style={{ padding: '4px' }}><RefreshCw size={12} /></button>
                    <button className="btn-glass" style={{ padding: '4px' }}><Download size={12} /></button>
                    <button className="btn-glass" style={{ padding: '4px' }}><Maximize2 size={12} /></button>
                </div>
            </div>

            {/* Platform Selector */}
            <div style={{ display: 'flex', gap: '6px', padding: '10px 14px', borderBottom: '1px solid var(--border-color)', flexWrap: 'wrap' }}>
                {platformTab('web', <Globe size={11} />, 'Web', '#6366f1')}
                {platformTab('ios', <Smartphone size={11} />, 'iOS', '#a78bfa')}
                {platformTab('android', <MonitorSmartphone size={11} />, 'Android', '#10b981')}
                {platformTab('linux', <Monitor size={11} />, 'Linux', '#fbbf24')}
                {platformTab('windows', <Laptop size={11} />, 'Win', '#22d3ee')}
            </div>

            {/* Preview Body */}
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', background: 'rgba(5, 5, 15, 0.3)' }}>
                {/* Mock Rendered UI Component */}
                <div style={{
                    width: platform === 'ios' || platform === 'android' ? '200px' : '100%',
                    maxWidth: '280px',
                    height: platform === 'ios' || platform === 'android' ? '360px' : '100%',
                    background: 'var(--bg-surface)',
                    borderRadius: platform === 'ios' || platform === 'android' ? '24px' : '12px',
                    border: platform === 'ios' || platform === 'android' ? '3px solid var(--border-color)' : 'var(--glass-border)',
                    padding: '16px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px',
                    animation: 'fadeInUp 0.3s var(--spring-fast)',
                    backdropFilter: 'blur(8px)',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
                    overflow: 'hidden',
                }}>
                    {(platform === 'ios' || platform === 'android') && (
                        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '4px' }}>
                            <div style={{ width: '60px', height: '4px', background: 'var(--border-color)', borderRadius: '2px' }}></div>
                        </div>
                    )}
                    <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-main)' }}>
                        {platform === 'web' && '🌐 Zynta Dashboard'}
                        {platform === 'ios' && '📱 ZyntaMobile'}
                        {platform === 'android' && '🤖 ZyntaDroid'}
                        {platform === 'linux' && '🐧 ZyntaLinux'}
                        {platform === 'windows' && '💻 ZyntaWin'}
                    </div>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)', lineHeight: '1.4' }}>AI-designed component rendered live as the agent writes code.</div>

                    {/* Mock UI Elements */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '8px' }}>
                        <div style={{ height: '28px', background: 'linear-gradient(90deg, var(--accent), var(--violet))', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 600, color: 'white' }}>
                            Get Started
                        </div>
                        <div style={{ height: '24px', background: 'rgba(255,255,255,0.04)', borderRadius: '6px', border: 'var(--glass-border)' }}></div>
                        <div style={{ height: '24px', background: 'rgba(255,255,255,0.04)', borderRadius: '6px', border: 'var(--glass-border)', width: '75%' }}></div>
                    </div>

                    {/* Mock chart/graph */}
                    <div style={{ flex: 1, display: 'flex', alignItems: 'flex-end', gap: '4px', paddingTop: '10px' }}>
                        {[35, 55, 40, 70, 50, 80, 60].map((h, i) => (
                            <div key={i} style={{
                                flex: 1,
                                height: `${h}%`,
                                background: `linear-gradient(180deg, var(--accent), rgba(99, 102, 241, 0.2))`,
                                borderRadius: '4px 4px 0 0',
                                opacity: 0.6 + (i * 0.05),
                                transition: 'height 0.3s var(--spring-fast)',
                            }}></div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Live Status Bar */}
            <div style={{ padding: '6px 14px', borderTop: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '11px', color: 'var(--text-dim)', background: 'rgba(5, 5, 15, 0.4)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <div className="status-dot online" style={{ width: '6px', height: '6px' }} />
                    <span>Live Render</span>
                </div>
                <span>React 18 • {platform.toUpperCase()}</span>
            </div>
        </div>
    );
}
