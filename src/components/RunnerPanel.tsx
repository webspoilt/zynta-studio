import { LayoutTemplate, Smartphone, MonitorSmartphone, PlayCircle, Settings2 } from 'lucide-react';
import { useState } from 'react';

export function RunnerPanel() {
    const [activeTab, setActiveTab] = useState<'web' | 'android' | 'windows'>('web');

    return (
        <div style={{
            width: '100%',
            padding: '16px',
            borderBottom: '1px solid var(--border-color)',
            background: 'var(--bg-surface)',
            position: 'relative'
        }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', fontWeight: 600 }}>
                    <PlayCircle size={16} color="var(--accent)" />
                    Zynta Runner Automations
                </div>
                <button style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
                    <Settings2 size={16} />
                </button>
            </div>

            <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
                <button
                    onClick={() => setActiveTab('web')}
                    style={{
                        flex: 1,
                        padding: '8px',
                        background: activeTab === 'web' ? 'rgba(99, 102, 241, 0.1)' : 'transparent',
                        border: `1px solid ${activeTab === 'web' ? 'var(--accent)' : 'var(--border-color)'}`,
                        borderRadius: '6px',
                        color: activeTab === 'web' ? 'white' : 'var(--text-muted)',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '6px',
                        fontSize: '12px'
                    }}
                >
                    <LayoutTemplate size={14} /> Web App
                </button>
                <button
                    onClick={() => setActiveTab('android')}
                    style={{
                        flex: 1,
                        padding: '8px',
                        background: activeTab === 'android' ? 'rgba(99, 102, 241, 0.1)' : 'transparent',
                        border: `1px solid ${activeTab === 'android' ? 'var(--accent)' : 'var(--border-color)'}`,
                        borderRadius: '6px',
                        color: activeTab === 'android' ? 'white' : 'var(--text-muted)',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '6px',
                        fontSize: '12px'
                    }}
                >
                    <Smartphone size={14} /> Android APK
                </button>
                <button
                    onClick={() => setActiveTab('windows')}
                    style={{
                        flex: 1,
                        padding: '8px',
                        background: activeTab === 'windows' ? 'rgba(99, 102, 241, 0.1)' : 'transparent',
                        border: `1px solid ${activeTab === 'windows' ? 'var(--accent)' : 'var(--border-color)'}`,
                        borderRadius: '6px',
                        color: activeTab === 'windows' ? 'white' : 'var(--text-muted)',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '6px',
                        fontSize: '12px'
                    }}
                >
                    <MonitorSmartphone size={14} /> Windows EXE
                </button>
            </div>

            <div style={{ background: 'var(--bg-dark)', padding: '12px', borderRadius: '8px', border: '1px solid var(--border-color)', fontSize: '12px', color: 'var(--text-muted)' }}>
                {activeTab === 'web' && (
                    <div>
                        <div style={{ color: 'white', marginBottom: '8px', fontWeight: 500 }}>The Auto-Browser Test</div>
                        <ul style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                            <li>Runs <code style={{ color: 'var(--cyan, #22d3ee)' }}>npm run build</code></li>
                            <li>Launches headless browser</li>
                            <li>Clicks all interactive elements to check for 404s/Throws</li>
                        </ul>
                    </div>
                )}
                {activeTab === 'android' && (
                    <div>
                        <div style={{ color: 'white', marginBottom: '8px', fontWeight: 500 }}>Virtual Device Flow</div>
                        <ul style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                            <li>Verifies <code style={{ color: 'var(--cyan, #22d3ee)' }}>Java</code> and <code style={{ color: 'var(--cyan, #22d3ee)' }}>Gradle</code> existence</li>
                            <li>Builds APK via <code style={{ color: 'var(--cyan, #22d3ee)' }}>assembleDebug</code></li>
                            <li>Deploys to running ADM / Physical device via <code style={{ color: 'var(--cyan, #22d3ee)' }}>adb install</code></li>
                        </ul>
                    </div>
                )}
                {activeTab === 'windows' && (
                    <div>
                        <div style={{ color: 'white', marginBottom: '8px', fontWeight: 500 }}>Windows Package Builder</div>
                        <ul style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                            <li>Statically analyzes dependency tree</li>
                            <li>Packages code using <code style={{ color: 'var(--cyan, #22d3ee)' }}>PyInstaller/InnoSetup</code></li>
                            <li>Tests silent install in hidden temp workspace</li>
                        </ul>
                    </div>
                )}
            </div>

            <button style={{
                width: '100%',
                marginTop: '16px',
                padding: '10px',
                background: 'var(--accent)',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
            }}>
                <PlayCircle size={16} /> Run {activeTab === 'web' ? 'Web Build' : activeTab === 'android' ? 'Android Build' : 'Windows Build'}
            </button>
        </div>
    );
}
