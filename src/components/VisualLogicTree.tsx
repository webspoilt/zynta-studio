import React, { useEffect, useState } from 'react';
import { invoke } from '@tauri-apps/api/tauri';

interface Node {
    id: string;
    type: string;
    status: string;
    children: Node[];
}

export const VisualLogicTree: React.FC = () => {
    const [tree, setTree] = useState<Node | null>(null);

    useEffect(() => {
        const fetchTree = async () => {
            try {
                const data = await invoke<Node>('get_execution_tree');
                setTree(data);
            } catch (e) {
                // Ignored for now since backend command might not be ready
                console.warn("Tree fetch failed:", e);
            }
        };
        fetchTree();
        const interval = setInterval(fetchTree, 1000);
        return () => clearInterval(interval);
    }, []);

    const renderNode = (node: Node): JSX.Element => (
        <div key={node.id} style={{ marginLeft: 20 }}>
            <div style={{ background: node.status === 'running' ? 'yellow' : 'green', padding: '5px', borderRadius: '4px', marginBottom: '5px' }}>
                {node.type} - {node.status}
            </div>
            {node.children.map(renderNode)}
        </div>
    );

    return <div style={{ padding: '10px' }}>{tree ? renderNode(tree) : <p>Loading Execution Tree...</p>}</div>;
};
