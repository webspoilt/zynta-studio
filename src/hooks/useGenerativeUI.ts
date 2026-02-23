import { invoke } from '@tauri-apps/api/tauri';

export const useGenerativeUI = () => {
    const generateAsset = async (prompt: string, type: 'svg' | 'theme' | 'icon'): Promise<string> => {
        return await invoke<string>('generate_ui_asset', { prompt, type });
    };

    const injectStyles = async (css: string) => {
        const style = document.createElement('style');
        style.innerHTML = css;
        document.head.appendChild(style);
    };

    return { generateAsset, injectStyles };
};
