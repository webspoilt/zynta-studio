import { Folder, Search, MessageSquare, Settings, ChevronRight, FileCode2, TerminalSquare, Github, Puzzle, Globe, RefreshCw, Plus, Download, Shield, Activity, Link, Unplug, WifiOff, Trophy, Flame, Bug, TestTube } from 'lucide-react';
import { useState } from 'react';

export function Sidebar() {
  const [activeView, setActiveView] = useState<'explorer' | 'search' | 'github' | 'plugins' | 'scraper' | 'sovereign'>('sovereign');

  const activityBtn = (view: string, icon: React.ReactNode, color?: string) => (
    <button onClick={() => setActiveView(view as any)} style={{
      background: 'transparent', border: 'none',
      color: activeView === view ? (color || 'var(--accent)') : 'var(--text-muted)',
      cursor: 'pointer', position: 'relative', padding: '6px',
      transition: 'color 0.2s ease',
    }}>
      {activeView === view && <div style={{ position: 'absolute', left: '-12px', top: '0', bottom: '0', width: '2px', background: color || 'var(--accent)', boxShadow: `0 0 8px ${color || 'var(--accent-glow)'}` }} />}
      {icon}
    </button>
  );

  return (
    <div style={{ display: 'flex', gridRow: '1 / -1', height: '100%', borderRight: '1px solid var(--border-color)' }}>

      {/* Activity Bar */}
      <div style={{ width: '48px', background: 'rgba(5, 5, 15, 0.6)', backdropFilter: 'blur(16px)', borderRight: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '12px 0' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', flex: 1 }}>
          {activityBtn('explorer', <Folder size={22} strokeWidth={1.5} />)}
          {activityBtn('search', <Search size={22} strokeWidth={1.5} />)}
          {activityBtn('github', <Github size={22} strokeWidth={1.5} />)}
          {activityBtn('plugins', <Puzzle size={22} strokeWidth={1.5} />)}
          {activityBtn('scraper', <Globe size={22} strokeWidth={1.5} />)}
          {activityBtn('sovereign', <Shield size={22} strokeWidth={1.5} />, 'var(--emerald)')}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <button style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: '6px' }}>
            <MessageSquare size={22} strokeWidth={1.5} />
          </button>
          <button style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: '6px' }}>
            <Settings size={22} strokeWidth={1.5} />
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="ide-panel" style={{ flex: 1, borderTop: 'none', borderBottom: 'none', borderLeft: 'none', borderRight: 'none', background: 'var(--bg-panel)' }}>

        {/* EXPLORER VIEW */}
        {activeView === 'explorer' && (
          <div style={{ padding: '12px', flex: 1, overflowY: 'auto', animation: 'fadeIn 0.2s ease-out' }}>
            <div style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '12px', letterSpacing: '1px' }}>
              Explorer
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', fontSize: '13px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', padding: '5px 6px', borderRadius: '6px', transition: 'background 0.15s ease' }}>
                <ChevronRight size={14} /> <Folder size={14} color="var(--accent)" /> src
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', padding: '5px 6px 5px 22px', borderRadius: '6px', background: 'var(--bg-surface)' }}>
                <FileCode2 size={14} color="#e34c26" /> App.tsx
                <span className="provenance-badge user-auth" style={{ marginLeft: 'auto' }}>USER</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', padding: '5px 6px 5px 22px', borderRadius: '6px' }}>
                <FileCode2 size={14} color="#2965f1" /> styles.css
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', padding: '5px 6px 5px 22px', borderRadius: '6px' }}>
                <TerminalSquare size={14} color="#f7df1e" /> main.tsx
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', padding: '5px 6px', borderRadius: '6px' }}>
                <ChevronRight size={14} /> <Folder size={14} color="var(--amber)" /> src-tauri
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', padding: '5px 6px 5px 22px', borderRadius: '6px' }}>
                <FileCode2 size={14} color="#dea584" /> main.rs
                <span className="provenance-badge zynta-gen" style={{ marginLeft: 'auto' }}>AI</span>
              </div>
            </div>
          </div>
        )}

        {/* SEARCH VIEW */}
        {activeView === 'search' && (
          <div style={{ padding: '12px', animation: 'fadeIn 0.2s ease-out' }}>
            <div style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '12px', letterSpacing: '1px' }}>Search</div>
            <input type="text" placeholder="Search across workspace..." style={{ width: '100%', padding: '8px 10px', background: 'var(--bg-surface)', border: '1px solid var(--border-color)', color: 'white', borderRadius: '8px', fontSize: '12px', outline: 'none' }} />
          </div>
        )}

        {/* GITHUB VIEW */}
        {activeView === 'github' && (
          <div style={{ display: 'flex', flexDirection: 'column', height: '100%', animation: 'fadeIn 0.2s ease-out' }}>
            <div style={{ padding: '12px', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)', letterSpacing: '1px', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span>Source Control</span>
              <RefreshCw size={12} cursor="pointer" />
            </div>
            <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ background: 'var(--bg-surface)', padding: '20px', borderRadius: '12px', border: 'var(--glass-border)', textAlign: 'center' }}>
                <Github size={32} color="var(--text-main)" style={{ margin: '0 auto 12px' }} />
                <div style={{ fontSize: '13px', fontWeight: 600, marginBottom: '8px' }}>GitHub Integration</div>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '16px', lineHeight: '1.5' }}>
                  Clone, pull, and push directly via the native <span style={{ color: 'var(--emerald)' }}>git2</span> Rust backend.
                </div>
                <button className="btn-accent" style={{ width: '100%', justifyContent: 'center' }}>
                  <Github size={14} /> Connect to GitHub
                </button>
              </div>
              {/* Provenance Chain Widget */}
              <div style={{ background: 'var(--bg-surface)', borderRadius: '12px', border: 'var(--glass-border)', padding: '14px' }}>
                <div style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Link size={12} /> Code Provenance Chain
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '6px' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Blocks:</span>
                  <span style={{ color: 'var(--text-main)', fontWeight: 600 }}>42</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '6px' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Chain Status:</span>
                  <span style={{ color: 'var(--emerald)', fontWeight: 600 }}>✓ Valid</span>
                </div>
                <div style={{ display: 'flex', gap: '8px', marginTop: '10px' }}>
                  <span className="provenance-badge user-auth">28 USER</span>
                  <span className="provenance-badge zynta-gen">11 AI</span>
                  <span className="provenance-badge hybrid">3 HYBRID</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* PLUGINS VIEW */}
        {activeView === 'plugins' && (
          <div style={{ display: 'flex', flexDirection: 'column', height: '100%', animation: 'fadeIn 0.2s ease-out' }}>
            <div style={{ padding: '12px', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)', letterSpacing: '1px', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span>Extensions</span>
              <Plus size={14} cursor="pointer" />
            </div>
            <div style={{ padding: '12px' }}>
              <input type="text" placeholder="Search VS Code Extensions..." style={{ width: '100%', padding: '8px 10px', background: 'var(--bg-surface)', border: '1px solid var(--border-color)', color: 'white', borderRadius: '8px', fontSize: '12px', outline: 'none', marginBottom: '16px' }} />
              <div style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '8px', textTransform: 'uppercase' }}>Installed Native Hosts</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div style={{ display: 'flex', gap: '12px', background: 'var(--bg-surface)', padding: '12px', borderRadius: '10px', border: 'var(--glass-border)' }}>
                  <div style={{ width: '32px', height: '32px', background: 'linear-gradient(135deg, #007ACC, #0065a9)', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 800, fontSize: '11px' }}>VS</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '13px', fontWeight: 600 }}>VS Code Extension Host</div>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>Runs .vsix extensions natively in Tauri</div>
                  </div>
                  <Settings size={14} color="var(--text-muted)" style={{ cursor: 'pointer' }} />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SCRAPER VIEW */}
        {activeView === 'scraper' && (
          <div style={{ display: 'flex', flexDirection: 'column', height: '100%', animation: 'fadeIn 0.2s ease-out' }}>
            <div style={{ padding: '12px', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)', letterSpacing: '1px', borderBottom: '1px solid var(--border-color)' }}>
              Agentic Web Scraper
            </div>
            <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)', lineHeight: '1.5' }}>
                Drop a URL here. A background agent will invisibly navigate to the page, parse the layout tree, and inject the UI elements directly into your codebase.
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '8px' }}>
                <input type="text" placeholder="https://dribbble.com/..." style={{ width: '100%', padding: '8px 10px', background: 'rgba(5,5,15,0.5)', border: '1px solid var(--accent)', color: 'white', borderRadius: '8px', fontSize: '12px', outline: 'none' }} />
                <button className="btn-accent" style={{ width: '100%', justifyContent: 'center' }}>
                  <Download size={14} /> Scrape & Import Design
                </button>
              </div>
              <div style={{ marginTop: '24px', borderTop: '1px dashed var(--border-color)', paddingTop: '16px' }}>
                <div style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '8px', textTransform: 'uppercase' }}>Recent Extractions</div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '12px', padding: '8px 10px', background: 'var(--bg-surface)', borderRadius: '8px', border: 'var(--glass-border)' }}>
                  <span style={{ color: 'var(--cyan)' }}>Tailwind_Navbar.tsx</span>
                  <span style={{ color: 'var(--text-dim)', fontSize: '11px' }}>Yesterday</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SOVEREIGN AI VIEW */}
        {activeView === 'sovereign' && (
          <div style={{ display: 'flex', flexDirection: 'column', height: '100%', animation: 'fadeIn 0.2s ease-out' }}>
            <div style={{ padding: '12px', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--emerald)', letterSpacing: '1px', borderBottom: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Shield size={14} /> Sovereign AI Protocol
            </div>
            <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '14px', overflowY: 'auto' }}>

              {/* Zero-Egress Toggle */}
              <div style={{ background: 'var(--bg-surface)', border: 'var(--glass-border)', borderRadius: '12px', padding: '16px', backdropFilter: 'blur(8px)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--emerald)', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <WifiOff size={14} />
                      Zero-Egress Mode
                    </div>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)', lineHeight: '1.4' }}>
                      Cuts all external cloud APIs. Cognitive processing runs entirely on local Ollama.
                    </div>
                  </div>
                  <div style={{ background: 'var(--emerald)', width: '36px', height: '20px', borderRadius: '10px', position: 'relative', cursor: 'pointer', marginLeft: '12px', boxShadow: '0 0 12px rgba(16, 185, 129, 0.4)' }}>
                    <div style={{ position: 'absolute', right: '2px', top: '2px', width: '16px', height: '16px', background: 'white', borderRadius: '50%', transition: 'left 0.2s var(--spring-fast)' }}></div>
                  </div>
                </div>
              </div>

              {/* Hardware Profiler — Bento Tile */}
              <div style={{ border: 'var(--glass-border)', borderRadius: '12px', overflow: 'hidden' }}>
                <div style={{ background: 'rgba(5,5,15,0.4)', padding: '10px 12px', borderBottom: '1px solid var(--border-color)', fontSize: '11px', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Activity size={12} /> Hardware Profiler
                </div>
                <div style={{ padding: '12px', background: 'var(--bg-surface)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Local Model:</span>
                    <span style={{ fontSize: '12px', color: 'var(--text-main)', fontWeight: 600 }}>Llama 3 (8B)</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>VRAM Usage:</span>
                    <span style={{ fontSize: '12px', color: 'var(--text-main)' }}>4.2 / 16.0 GB</span>
                  </div>
                  {/* VRAM bar */}
                  <div style={{ height: '4px', background: 'rgba(255,255,255,0.06)', borderRadius: '2px', marginBottom: '10px' }}>
                    <div style={{ height: '4px', background: 'linear-gradient(90deg, var(--emerald), var(--cyan))', borderRadius: '2px', width: '26%', boxShadow: '0 0 8px rgba(16, 185, 129, 0.3)' }}></div>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Outbound Network:</span>
                    <span style={{ fontSize: '12px', color: 'var(--emerald)', fontWeight: 600 }}>0 KB/s (Blocked)</span>
                  </div>
                </div>
              </div>

              {/* Model Switching — Latency Hacking */}
              <div style={{ background: 'var(--bg-surface)', border: 'var(--glass-border)', borderRadius: '12px', padding: '14px' }}>
                <div style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Unplug size={12} /> Model Switching
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <div style={{ flex: 1, background: 'rgba(16, 185, 129, 0.06)', border: '1px solid rgba(16, 185, 129, 0.15)', borderRadius: '8px', padding: '10px', textAlign: 'center' }}>
                    <div style={{ fontSize: '11px', color: 'var(--emerald)', fontWeight: 600, marginBottom: '2px' }}>Fast</div>
                    <div style={{ fontSize: '10px', color: 'var(--text-dim)' }}>Llama 3 8B</div>
                    <div style={{ fontSize: '9px', color: 'var(--text-dim)', marginTop: '2px' }}>~80ms</div>
                  </div>
                  <div style={{ flex: 1, background: 'rgba(99, 102, 241, 0.06)', border: '1px solid rgba(99, 102, 241, 0.15)', borderRadius: '8px', padding: '10px', textAlign: 'center' }}>
                    <div style={{ fontSize: '11px', color: 'var(--accent)', fontWeight: 600, marginBottom: '2px' }}>Heavy</div>
                    <div style={{ fontSize: '10px', color: 'var(--text-dim)' }}>Claude 3.5</div>
                    <div style={{ fontSize: '9px', color: 'var(--text-dim)', marginTop: '2px' }}>~2.1s</div>
                  </div>
                </div>
                <div style={{ fontSize: '10px', color: 'var(--text-dim)', marginTop: '8px', textAlign: 'center' }}>
                  Judge Agent auto-selects based on complexity
                </div>
              </div>

              {/* PII Scanner */}
              <div style={{ background: 'rgba(239, 68, 68, 0.05)', border: '1px solid rgba(239, 68, 68, 0.12)', borderRadius: '12px', padding: '12px', display: 'flex', gap: '10px' }}>
                <Shield size={18} color="var(--rose)" style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--rose)', marginBottom: '4px' }}>PII Scanner Active</div>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)', lineHeight: '1.4' }}>
                    Rust regex middleware is scrubbing context. Synthetic placeholders used for cloud fallback.
                  </div>
                </div>
              </div>

              {/* Streaks & Achievements — Gamification */}
              <div style={{ background: 'var(--bg-surface)', border: 'var(--glass-border)', borderRadius: '12px', padding: '14px' }}>
                <div style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', color: 'var(--amber)', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Trophy size={12} /> Flow Streaks
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px' }}>
                    <div style={{ width: '24px', height: '24px', background: 'linear-gradient(135deg, var(--rose), #dc2626)', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Bug size={12} color="white" /></div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 600, color: 'var(--text-main)' }}>The Bugslayer</div>
                      <div style={{ fontSize: '10px', color: 'var(--text-dim)' }}>7 / 10 critical bugs fixed today</div>
                    </div>
                    <Flame size={14} color="var(--amber)" />
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px' }}>
                    <div style={{ width: '24px', height: '24px', background: 'linear-gradient(135deg, var(--emerald), #059669)', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><TestTube size={12} color="white" /></div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 600, color: 'var(--text-main)' }}>Clean Coder</div>
                      <div style={{ fontSize: '10px', color: 'var(--text-dim)' }}>96% test coverage • 4 day streak</div>
                    </div>
                    <Flame size={14} color="var(--emerald)" />
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
}
