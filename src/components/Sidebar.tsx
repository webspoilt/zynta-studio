import { Folder, Search, MessageSquare, Settings, ChevronRight, FileCode2, TerminalSquare } from 'lucide-react';

export function Sidebar() {
  return (
    <div className="ide-panel" style={{ gridRow: '1 / -1', borderRight: '1px solid var(--border-color)' }}>
      {/* Top Activity Bar */}
      <div style={{ display: 'flex', borderBottom: '1px solid var(--border-color)', padding: '12px' }}>
        <button style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', marginRight: '16px', cursor: 'pointer' }}>
          <Folder size={20} />
        </button>
        <button style={{ background: 'transparent', border: 'none', color: 'var(--accent)', marginRight: '16px', cursor: 'pointer' }}>
          <Search size={20} />
        </button>
        <button style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
          <MessageSquare size={20} />
        </button>
      </div>

      {/* Explorer section */}
      <div style={{ padding: '12px', flex: 1, overflowY: 'auto' }}>
        <div style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '12px', letterSpacing: '1px' }}>
          Explorer
        </div>
        
        {/* Mock File Tree */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '13px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', padding: '4px', borderRadius: '4px' }}>
            <ChevronRight size={14} /> <Folder size={14} color="var(--accent)" /> src
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', padding: '4px 4px 4px 20px', borderRadius: '4px', background: 'var(--bg-surface)' }}>
            <FileCode2 size={14} color="#e34c26" /> App.tsx
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', padding: '4px 4px 4px 20px', borderRadius: '4px' }}>
            <FileCode2 size={14} color="#2965f1" /> styles.css
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', padding: '4px 4px 4px 20px', borderRadius: '4px' }}>
            <TerminalSquare size={14} color="#f7df1e" /> main.tsx
          </div>
        </div>
      </div>

      {/* Settings Bottom */}
      <div style={{ borderTop: '1px solid var(--border-color)', padding: '12px', display: 'flex', justifyContent: 'center' }}>
        <button style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
          <Settings size={20} />
        </button>
      </div>
    </div>
  );
}
