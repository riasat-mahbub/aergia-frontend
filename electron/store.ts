import { CV, FormGroup, AppSettings, UserSettings, CustomTemplate, FormGroupType } from './types';

interface StoreSchema {
  cvs: CV[];
  formGroups: Record<string, FormGroup[]>;
  settings: AppSettings;
}

const defaultSettings: AppSettings = {
  user: {
    fullName: '',
    email: '',
    theme: 'system',
  },
  customTemplates: {},
};

// eslint-disable-next-line @typescript-eslint/no-var-requires
const Store = require('electron-store').default;

const store = new Store({
  defaults: {
    cvs: [],
    formGroups: {},
    settings: defaultSettings,
  },
});

export const cvStore = {
  getAll: (): CV[] => {
    const cvs: CV[] = store.get('cvs') || [];
    return [...cvs].sort((a, b) => a.order - b.order);
  },

  getById: (id: string): CV | undefined => {
    const cvs: CV[] = store.get('cvs') || [];
    return cvs.find(cv => cv.id === id);
  },

  create: (cv: CV): CV => {
    const cvs: CV[] = store.get('cvs') || [];
    cvs.push(cv);
    store.set('cvs', cvs);
    return cv;
  },

  update: (id: string, updates: Partial<CV>): CV | undefined => {
    const cvs: CV[] = store.get('cvs') || [];
    const index = cvs.findIndex(cv => cv.id === id);
    if (index === -1) return undefined;
    
    cvs[index] = { ...cvs[index], ...updates, updatedAt: new Date().toISOString() };
    store.set('cvs', cvs);
    return cvs[index];
  },

  delete: (id: string): boolean => {
    const cvs: CV[] = store.get('cvs') || [];
    const index = cvs.findIndex(cv => cv.id === id);
    if (index === -1) return false;
    
    cvs.splice(index, 1);
    store.set('cvs', cvs);
    
    const formGroups: Record<string, FormGroup[]> = store.get('formGroups') || {};
    delete formGroups[id];
    store.set('formGroups', formGroups);
    
    return true;
  },

  reorder: (activeId: string, overId: string): boolean => {
    const cvs: CV[] = store.get('cvs') || [];
    const activeIndex = cvs.findIndex(cv => cv.id === activeId);
    const overIndex = cvs.findIndex(cv => cv.id === overId);
    
    if (activeIndex === -1 || overIndex === -1) return false;
    
    const temp = cvs[activeIndex].order;
    cvs[activeIndex].order = cvs[overIndex].order;
    cvs[overIndex].order = temp;
    
    store.set('cvs', cvs);
    return true;
  },

  getMaxOrder: (): number => {
    const cvs: CV[] = store.get('cvs') || [];
    if (cvs.length === 0) return 0;
    return Math.max(...cvs.map(cv => cv.order));
  },
};

export const formGroupStore = {
  getAll: (cvId: string): FormGroup[] => {
    const formGroups: Record<string, FormGroup[]> = store.get('formGroups') || {};
    const groups = formGroups[cvId] || [];
    return [...groups].sort((a, b) => a.order - b.order);
  },

  getById: (cvId: string, id: string): FormGroup | undefined => {
    const formGroups: Record<string, FormGroup[]> = store.get('formGroups') || {};
    const groups = formGroups[cvId] || [];
    return groups.find(fg => fg.id === id);
  },

  create: (cvId: string, formGroup: FormGroup): FormGroup => {
    const formGroups: Record<string, FormGroup[]> = store.get('formGroups') || {};
    if (!formGroups[cvId]) {
      formGroups[cvId] = [];
    }
    formGroups[cvId].push(formGroup);
    store.set('formGroups', formGroups);
    return formGroup;
  },

  update: (cvId: string, id: string, updates: Partial<FormGroup>): FormGroup | undefined => {
    const formGroups: Record<string, FormGroup[]> = store.get('formGroups') || {};
    const groups = formGroups[cvId];
    if (!groups) return undefined;
    
    const index = groups.findIndex(fg => fg.id === id);
    if (index === -1) return undefined;
    
    groups[index] = { ...groups[index], ...updates, updatedAt: new Date().toISOString() };
    store.set('formGroups', formGroups);
    return groups[index];
  },

  delete: (cvId: string, id: string): boolean => {
    const formGroups: Record<string, FormGroup[]> = store.get('formGroups') || {};
    const groups = formGroups[cvId];
    if (!groups) return false;
    
    const index = groups.findIndex(fg => fg.id === id);
    if (index === -1) return false;
    
    groups.splice(index, 1);
    store.set('formGroups', formGroups);
    return true;
  },

  reorder: (cvId: string, activeId: string, overId: string): boolean => {
    const formGroups: Record<string, FormGroup[]> = store.get('formGroups') || {};
    const groups = formGroups[cvId];
    if (!groups) return false;
    
    const activeIndex = groups.findIndex(fg => fg.id === activeId);
    const overIndex = groups.findIndex(fg => fg.id === overId);
    
    if (activeIndex === -1 || overIndex === -1) return false;
    
    const temp = groups[activeIndex].order;
    groups[activeIndex].order = groups[overIndex].order;
    groups[overIndex].order = temp;
    
    store.set('formGroups', formGroups);
    return true;
  },

  getMaxOrder: (cvId: string): number => {
    const formGroups: Record<string, FormGroup[]> = store.get('formGroups') || {};
    const groups = formGroups[cvId] || [];
    if (groups.length === 0) return 0;
    return Math.max(...groups.map(fg => fg.order));
  },
};

export const settingsStore = {
  get: (): AppSettings => {
    return store.get('settings') || defaultSettings;
  },

  updateUser: (updates: Partial<UserSettings>): UserSettings => {
    const settings: AppSettings = store.get('settings') || defaultSettings;
    settings.user = { ...settings.user, ...updates };
    store.set('settings', settings);
    return settings.user;
  },

  saveCustomTemplate: (templateName: string, type: FormGroupType, template: CustomTemplate): void => {
    const settings: AppSettings = store.get('settings') || defaultSettings;
    if (!settings.customTemplates[templateName]) {
      settings.customTemplates[templateName] = {} as Record<FormGroupType, CustomTemplate>;
    }
    settings.customTemplates[templateName][type] = template;
    store.set('settings', settings);
  },

  getCustomTemplate: (templateName: string, type: FormGroupType): CustomTemplate | undefined => {
    const settings: AppSettings = store.get('settings') || defaultSettings;
    return settings.customTemplates[templateName]?.[type];
  },
};

export default store;
