export type FormGroupType = 
  | 'profile' 
  | 'experience' 
  | 'education' 
  | 'skills' 
  | 'project' 
  | 'custom'
  | 'certification'
  | 'language'
  | 'award'
  | 'volunteer'
  | 'publication';

export interface CV {
  id: string;
  title: string;
  template: string;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface FormGroup {
  id: string;
  title: string;
  type: FormGroupType;
  cvId: string;
  order: number;
  visible: boolean;
  data: Record<string, any>[];
  structure: Record<string, any> | null;
  style: Record<string, Record<string, string | number>> | null;
  createdAt: string;
  updatedAt: string;
}

export interface UserSettings {
  fullName: string;
  email: string;
  theme: 'light' | 'dark' | 'system';
}

export interface TemplateStyle {
  [selector: string]: {
    [property: string]: string | number;
  };
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

export interface CustomTemplate {
  structure: TemplateStructure;
  style: TemplateStyle;
}

export interface AppSettings {
  user: UserSettings;
  customTemplates: Record<string, Record<FormGroupType, CustomTemplate>>;
}

export interface CreateCVData {
  title: string;
  template?: string;
}

export interface UpdateCVData {
  title?: string;
  template?: string;
  order?: number;
}

export interface CreateFormGroupData {
  title: string;
  type: FormGroupType;
  data?: Record<string, any>[];
}

export interface UpdateFormGroupData {
  title?: string;
  type?: FormGroupType;
  data?: Record<string, any>[];
  visible?: boolean;
  order?: number;
  structure?: Record<string, any>;
  style?: Record<string, Record<string, string | number>>;
}

export interface ReorderData {
  activeId: string;
  overId: string;
}
