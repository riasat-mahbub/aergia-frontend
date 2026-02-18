/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

interface ElectronAPI {
  savePdf: (pdfData: ArrayBuffer, defaultName: string) => Promise<{ success: boolean; path: string | null }>;
}

declare global {
  interface Window {
    electronAPI?: ElectronAPI;
  }
}

export {};
