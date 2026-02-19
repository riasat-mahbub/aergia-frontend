/// <reference types="vite/client" />

interface ImportMetaEnv {
  // Environment variables can be added here if needed
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

export interface CV {
  id: string;
  title: string;
  template: string;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export type DateFormat = 
  | 'mm-yyyy'
  | 'dd-mm-yyyy'
  | 'dd-mm-yy'
  | 'month_name-yyyy'
  | 'mon-yyyy'
  | 'yyyy';

export interface FormGroup {
  id: string;
  title: string;
  type: string;
  cvId: string;
  order: number;
  visible: boolean;
  data: Record<string, any>[];
  structure: Record<string, any> | null;
  style: Record<string, Record<string, string | number>> | null;
  dateFormat: DateFormat;
  createdAt: string;
  updatedAt: string;
}

export interface UserSettings {
  fullName: string;
  email: string;
  theme: 'light' | 'dark' | 'system';
}

export interface AppSettings {
  user: UserSettings;
  customTemplates: Record<string, Record<string, { structure: any; style: any }>>;
}

export interface TemplateStructure {
  type: string;
  style?: string;
  bind?: string;
  children?: TemplateStructure[];
  source?: string;
  template?: TemplateStructure;
  textbind?: string;
  if?: string;
  visible?: boolean;
}

export interface TemplateStyle {
  [selector: string]: {
    [property: string]: string | number;
  };
}

export interface CustomTemplate {
  structure: TemplateStructure;
  style: TemplateStyle;
}

interface ElectronAPI {
  cvs: {
    getAll: () => Promise<{ cvs: CV[] }>;
    create: (data: { title: string; template?: string }) => Promise<{ message: string; data: CV }>;
    get: (id: string) => Promise<{ message: string; data: CV } | null>;
    update: (id: string, data: { title?: string; template?: string; order?: number }) => Promise<{ cv: CV } | null>;
    delete: (id: string) => Promise<{ message: string } | null>;
    reorder: (data: { activeId: string; overId: string }) => Promise<{ message: string } | null>;
  };
  formGroups: {
    getAll: (cvId: string) => Promise<{ formHolders: FormGroup[] }>;
    create: (cvId: string, data: { title: string; type: string; data?: unknown[] }) => Promise<{ formGroup: FormGroup } | { message: string; error: string }>;
    get: (cvId: string, id: string) => Promise<{ formGroup: FormGroup } | null>;
    update: (cvId: string, id: string, data: Record<string, unknown>) => Promise<{ formGroup: FormGroup } | null>;
    delete: (cvId: string, id: string) => Promise<{ message: string } | null>;
    reorder: (cvId: string, data: { activeId: string; overId: string }) => Promise<{ message: string } | null>;
  };
  settings: {
    get: () => Promise<AppSettings>;
    updateUser: (data: Partial<UserSettings>) => Promise<UserSettings>;
  };
  templates: {
    getStructure: (templateName: string, type: string) => Promise<TemplateStructure>;
    getStyle: (templateName: string, type: string) => Promise<TemplateStyle>;
    getDefaultStructure: (templateName: string, type: string) => Promise<TemplateStructure>;
    getDefaultStyle: (templateName: string, type: string) => Promise<TemplateStyle>;
    saveCustom: (templateName: string, type: string, template: CustomTemplate) => Promise<void>;
    getCustom: (templateName: string, type: string) => Promise<CustomTemplate | undefined>;
    getAvailableTemplates: () => Promise<string[]>;
    getAvailableComponents: (templateName: string) => Promise<string[]>;
  };
  pdf: {
    generate: (cvId: string) => Promise<Buffer | null>;
  };
  savePdf: (pdfData: ArrayBuffer, defaultName: string) => Promise<{ success: boolean; path: string | null }>;
}

declare global {
  interface Window {
    electronAPI: ElectronAPI;
  }
}

export {};
