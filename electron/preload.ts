import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electronAPI', {
  // CV Operations
  cvs: {
    getAll: () => ipcRenderer.invoke('cv:getAll'),
    create: (data: { title: string; template?: string }) => ipcRenderer.invoke('cv:create', data),
    get: (id: string) => ipcRenderer.invoke('cv:get', id),
    update: (id: string, data: { title?: string; template?: string; order?: number }) =>
      ipcRenderer.invoke('cv:update', id, data),
    delete: (id: string) => ipcRenderer.invoke('cv:delete', id),
    reorder: (data: { activeId: string; overId: string }) => ipcRenderer.invoke('cv:reorder', data),
  },

  // FormGroup Operations
  formGroups: {
    getAll: (cvId: string) => ipcRenderer.invoke('formGroup:getAll', cvId),
    create: (cvId: string, data: { title: string; type: string; data?: unknown[] }) =>
      ipcRenderer.invoke('formGroup:create', cvId, data),
    get: (cvId: string, id: string) => ipcRenderer.invoke('formGroup:get', cvId, id),
    update: (cvId: string, id: string, data: Record<string, unknown>) =>
      ipcRenderer.invoke('formGroup:update', cvId, id, data),
    delete: (cvId: string, id: string) => ipcRenderer.invoke('formGroup:delete', cvId, id),
    reorder: (cvId: string, data: { activeId: string; overId: string }) =>
      ipcRenderer.invoke('formGroup:reorder', cvId, data),
  },

  // Settings
  settings: {
    get: () => ipcRenderer.invoke('settings:get'),
    updateUser: (data: { fullName?: string; email?: string }) => ipcRenderer.invoke('settings:updateUser', data),
  },

  // Templates
  templates: {
    getStructure: (templateName: string, type: string) =>
      ipcRenderer.invoke('template:getStructure', templateName, type),
    getStyle: (templateName: string, type: string) => ipcRenderer.invoke('template:getStyle', templateName, type),
    getDefaultStructure: (templateName: string, type: string) =>
      ipcRenderer.invoke('template:getDefaultStructure', templateName, type),
    getDefaultStyle: (templateName: string, type: string) =>
      ipcRenderer.invoke('template:getDefaultStyle', templateName, type),
    saveCustom: (templateName: string, type: string, template: unknown) =>
      ipcRenderer.invoke('template:saveCustom', templateName, type, template),
    getCustom: (templateName: string, type: string) =>
      ipcRenderer.invoke('template:getCustom', templateName, type),
    getAvailableTemplates: () => ipcRenderer.invoke('template:getAvailableTemplates'),
    getAvailableComponents: (templateName: string) =>
      ipcRenderer.invoke('template:getAvailableComponents', templateName),
  },

  // PDF
  pdf: {
    generate: (cvId: string) => ipcRenderer.invoke('pdf:generate', cvId),
  },

  // Save PDF dialog
  savePdf: async (pdfData: ArrayBuffer, defaultName: string) => {
    const buffer = Buffer.from(pdfData);
    return await ipcRenderer.invoke('save-pdf', buffer, defaultName);
  },

  // Import
  import: {
    fromPdf: () => ipcRenderer.invoke('import:fromPdf'),
  },
});
