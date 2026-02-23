import { VisualLogicTree } from './components/VisualLogicTree';
import { useGenerativeUI } from './hooks/useGenerativeUI';

function App() {
    const { generateAsset, injectStyles } = useGenerativeUI();

    const handleGenerateTheme = async () => {
        try {
            const css = await generateAsset('dark theme with neon accents', 'theme');
            injectStyles(css);
        } catch (e) {
            console.error("Failed to generate theme:", e);
        }
    };

    return (
        <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
            <h1>Zynta Studio</h1>
            <button onClick={handleGenerateTheme} style={{ padding: '10px', marginBottom: '20px', cursor: 'pointer' }}>Generate Theme</button>
            <div style={{ height: '600px', border: '1px solid #ccc' }}>
                <VisualLogicTree />
            </div>
        </div>
    );
}

export default App;
