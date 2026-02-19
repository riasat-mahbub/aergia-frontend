import type { TemplateStructure, TemplateStyle } from '../vite-env';

class ElectronApiService {
  private get api() {
    if (!window.electronAPI) {
      throw new Error('Electron API not available');
    }
    return window.electronAPI;
  }

  auth = {
    register: async () => {
      return { message: 'Registration not needed in desktop app' };
    },
    login: async () => {
      return { message: 'Login not needed in desktop app' };
    },
    logout: async () => {
      return { message: 'Logout not needed in desktop app' };
    },
    isLoggedIn: async () => {
      return { loggedIn: true };
    },
  };

  cvs = {
    getAll: () => this.api.cvs.getAll(),

    create: (data: { title: string; template?: string }) => this.api.cvs.create(data),

    update: (id: string, data: { title?: string; template?: string; order?: number }) =>
      this.api.cvs.update(id, data),

    reorder: (data: { activeId: string; overId: string }) => this.api.cvs.reorder(data),

    get: (id: string) => this.api.cvs.get(id),

    delete: (id: string) => this.api.cvs.delete(id),

    generatePdf: async (id: string) => {
      const buffer = await this.api.pdf.generate(id);
      if (!buffer) {
        throw new Error('Failed to generate PDF');
      }
      return buffer;
    },
  };

  formGroups = {
    getAll: (cvId: string) => this.api.formGroups.getAll(cvId),

    create: (cvId: string, data: { title: string; type: string; data?: string | unknown[] }) => {
      let parsedData: unknown[] | undefined;
      if (typeof data.data === 'string') {
        try {
          parsedData = JSON.parse(data.data);
        } catch {
          parsedData = [];
        }
      } else {
        parsedData = data.data;
      }
      return this.api.formGroups.create(cvId, {
        title: data.title,
        type: data.type,
        data: parsedData,
      });
    },

    get: (cvId: string, id: string) => this.api.formGroups.get(cvId, id),

    update: (
      cvId: string,
      id: string,
      data: { title?: string; type?: string; data?: string | unknown[]; style?: string | Record<string, unknown>; order?: number; visible?: boolean }
    ) => {
      const updateData: Record<string, unknown> = { ...data };
      if (typeof data.data === 'string') {
        try {
          updateData.data = JSON.parse(data.data);
        } catch {
          updateData.data = [];
        }
      }
      if (typeof data.style === 'string') {
        try {
          updateData.style = JSON.parse(data.style);
        } catch {
          updateData.style = {};
        }
      }
      return this.api.formGroups.update(cvId, id, updateData);
    },

    reorder: (cvId: string, data: { activeId: string; overId: string }) =>
      this.api.formGroups.reorder(cvId, data),

    delete: (cvId: string, id: string) => this.api.formGroups.delete(cvId, id),
  };

  users = {
    getUser: async () => {
      const settings = await this.api.settings.get();
      return {
        name: settings.user.fullName,
        email: settings.user.email,
      };
    },
  };

  settings = {
    get: () => this.api.settings.get(),
    updateUser: (data: { fullName?: string; email?: string }) => this.api.settings.updateUser(data),
  };

  templates = {
    getStructure: (templateName: string, type: string) => this.api.templates.getStructure(templateName, type),
    getStyle: (templateName: string, type: string) => this.api.templates.getStyle(templateName, type),
    getDefaultStructure: (templateName: string, type: string) =>
      this.api.templates.getDefaultStructure(templateName, type),
    getDefaultStyle: (templateName: string, type: string) => this.api.templates.getDefaultStyle(templateName, type),
    saveCustom: (templateName: string, type: string, template: { structure: unknown; style: unknown }) =>
      this.api.templates.saveCustom(templateName, type, template as { structure: TemplateStructure; style: TemplateStyle }),
    getCustom: (templateName: string, type: string) => this.api.templates.getCustom(templateName, type),
    getAvailableTemplates: () => this.api.templates.getAvailableTemplates(),
    getAvailableComponents: (templateName: string) => this.api.templates.getAvailableComponents(templateName),
  };

  pdf = {
    generate: (cvId: string) => this.api.pdf.generate(cvId),
    save: (pdfData: ArrayBuffer, defaultName: string) => this.api.savePdf(pdfData, defaultName),
  };
}

export const apiService = new ElectronApiService();
