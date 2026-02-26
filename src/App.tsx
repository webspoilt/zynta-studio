import { Sidebar } from './components/Sidebar';
import { EditorArea } from './components/EditorArea';
import { ArtifactPreview } from './components/ArtifactPreview';
import { AgentTerminal } from './components/AgentTerminal';

function App() {
    return (
        <div className="ide-layout">
            {/* 260px Sidebar */}
            <Sidebar />

            {/* Center Top: Editor Region */}
            <EditorArea />

            {/* Bottom: Terminal Region spanning under the editor */}
            <AgentTerminal />

            {/* 300px Right Panel: Preview spanning full height */}
            <ArtifactPreview />
        </div>
    );
}

export default App;
