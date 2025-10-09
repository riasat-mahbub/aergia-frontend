export interface Template {
  value: string;
  label: string;
  description?: string;
}

export const TEMPLATES: Template[] = [
  {
    value: "MIT",
    label: "MIT Template",
    description: "Clean and professional template inspired by MIT's style"
  },
  {
    value: "Harvard",
    label: "Harvard Template", 
    description: "Classic academic template with Harvard styling"
  }
];

export const DEFAULT_TEMPLATE = "MIT";

// Helper functions
export const getTemplateByValue = (value: string): Template | undefined => {
  return TEMPLATES.find(template => template.value === value);
};

export const getTemplateLabel = (value: string): string => {
  return getTemplateByValue(value)?.label || value;
};

export const isValidTemplate = (value: string): boolean => {
  return TEMPLATES.some(template => template.value === value);
};