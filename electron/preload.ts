import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electronAPI', {
  savePdf: async (pdfData: ArrayBuffer, defaultName: string) => {
    const buffer = Buffer.from(pdfData);
    return await ipcRenderer.invoke('save-pdf', buffer, defaultName);
  },
});
