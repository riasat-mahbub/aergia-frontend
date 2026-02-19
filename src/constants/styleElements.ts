export interface StyleElement {
  selector: string;
  label: string;
  hasDateFormat?: boolean;
  defaultStyles?: Record<string, string>;
}

export const SECTION_STYLE_ELEMENTS: Record<string, StyleElement[]> = {
  profile: [
    {
      selector: '.sectionTitle',
      label: 'Section Title',
      defaultStyles: {
        'font-family': 'Arimo',
        'font-size': '14px',
        'font-weight': 'normal',
        'color': '#000000',
      },
    },
    {
      selector: '.name',
      label: 'Name',
      defaultStyles: {
        'font-family': 'Arimo',
        'font-size': '18px',
        'font-weight': 'bold',
        'color': '#000000',
      },
    },
    {
      selector: '.contactRow',
      label: 'Contact Row',
      defaultStyles: {
        'font-family': 'Arimo',
        'font-size': '10px',
        'font-weight': 'normal',
        'color': '#000000',
      },
    },
    {
      selector: '.summary',
      label: 'Summary',
      defaultStyles: {
        'font-family': 'Arimo',
        'font-size': '10px',
        'font-weight': 'normal',
        'color': '#000000',
      },
    },
  ],
  experience: [
    {
      selector: '.sectionTitle',
      label: 'Section Title',
      defaultStyles: {
        'font-family': 'Arimo',
        'font-size': '14px',
        'font-weight': 'normal',
        'color': '#000000',
      },
    },
    {
      selector: '.title',
      label: 'Company Name',
      defaultStyles: {
        'font-family': 'Arimo',
        'font-size': '12px',
        'font-weight': 'bold',
        'color': '#000000',
      },
    },
    {
      selector: '.subtitle',
      label: 'Job Title',
      defaultStyles: {
        'font-family': 'Arimo',
        'font-size': '11px',
        'font-weight': 'normal',
        'color': '#000000',
      },
    },
    {
      selector: '.date',
      label: 'Date',
      hasDateFormat: true,
      defaultStyles: {
        'font-family': 'Arimo',
        'font-size': '10px',
        'font-weight': 'normal',
        'color': '#000000',
      },
    },
    {
      selector: '.location',
      label: 'Location',
      defaultStyles: {
        'font-family': 'Arimo',
        'font-size': '10px',
        'font-weight': 'normal',
        'color': '#000000',
      },
    },
    {
      selector: '.description',
      label: 'Description',
      defaultStyles: {
        'font-family': 'Arimo',
        'font-size': '10px',
        'font-weight': 'normal',
        'color': '#000000',
      },
    },
  ],
  education: [
    {
      selector: '.sectionTitle',
      label: 'Section Title',
      defaultStyles: {
        'font-family': 'Arimo',
        'font-size': '14px',
        'font-weight': 'normal',
        'color': '#000000',
      },
    },
    {
      selector: '.title',
      label: 'School Name',
      defaultStyles: {
        'font-family': 'Arimo',
        'font-size': '12px',
        'font-weight': 'bold',
        'color': '#000000',
      },
    },
    {
      selector: '.subtitle',
      label: 'Degree',
      defaultStyles: {
        'font-family': 'Arimo',
        'font-size': '11px',
        'font-weight': 'normal',
        'color': '#000000',
      },
    },
    {
      selector: '.date',
      label: 'Date',
      hasDateFormat: true,
      defaultStyles: {
        'font-family': 'Arimo',
        'font-size': '10px',
        'font-weight': 'normal',
        'color': '#000000',
      },
    },
    {
      selector: '.location',
      label: 'Location',
      defaultStyles: {
        'font-family': 'Arimo',
        'font-size': '10px',
        'font-weight': 'normal',
        'color': '#000000',
      },
    },
    {
      selector: '.gpa',
      label: 'GPA',
      defaultStyles: {
        'font-family': 'Arimo',
        'font-size': '10px',
        'font-weight': 'normal',
        'color': '#000000',
      },
    },
    {
      selector: '.description',
      label: 'Description',
      defaultStyles: {
        'font-family': 'Arimo',
        'font-size': '10px',
        'font-weight': 'normal',
        'color': '#000000',
      },
    },
  ],
  project: [
    {
      selector: '.sectionTitle',
      label: 'Section Title',
      defaultStyles: {
        'font-family': 'Arimo',
        'font-size': '14px',
        'font-weight': 'normal',
        'color': '#000000',
      },
    },
    {
      selector: '.title',
      label: 'Project Name',
      defaultStyles: {
        'font-family': 'Arimo',
        'font-size': '12px',
        'font-weight': 'bold',
        'color': '#000000',
      },
    },
    {
      selector: '.subtitle',
      label: 'Role/Subtitle',
      defaultStyles: {
        'font-family': 'Arimo',
        'font-size': '11px',
        'font-weight': 'normal',
        'color': '#000000',
      },
    },
    {
      selector: '.date',
      label: 'Date',
      hasDateFormat: true,
      defaultStyles: {
        'font-family': 'Arimo',
        'font-size': '10px',
        'font-weight': 'normal',
        'color': '#000000',
      },
    },
    {
      selector: '.description',
      label: 'Description',
      defaultStyles: {
        'font-family': 'Arimo',
        'font-size': '10px',
        'font-weight': 'normal',
        'color': '#000000',
      },
    },
  ],
  skills: [
    {
      selector: '.sectionTitle',
      label: 'Section Title',
      defaultStyles: {
        'font-family': 'Arimo',
        'font-size': '14px',
        'font-weight': 'normal',
        'color': '#000000',
      },
    },
    {
      selector: '.name',
      label: 'Category',
      defaultStyles: {
        'font-family': 'Arimo',
        'font-size': '11px',
        'font-weight': 'normal',
        'color': '#000000',
      },
    },
    {
      selector: '.description',
      label: 'Description',
      defaultStyles: {
        'font-family': 'Arimo',
        'font-size': '10px',
        'font-weight': 'normal',
        'color': '#000000',
      },
    },
  ],
  custom: [
    {
      selector: '.sectionTitle',
      label: 'Section Title',
      defaultStyles: {
        'font-family': 'Arimo',
        'font-size': '14px',
        'font-weight': 'normal',
        'color': '#000000',
      },
    },
    {
      selector: '.title',
      label: 'Title',
      defaultStyles: {
        'font-family': 'Arimo',
        'font-size': '12px',
        'font-weight': 'bold',
        'color': '#000000',
      },
    },
    {
      selector: '.subtitle',
      label: 'Subtitle',
      defaultStyles: {
        'font-family': 'Arimo',
        'font-size': '11px',
        'font-weight': 'normal',
        'color': '#000000',
      },
    },
    {
      selector: '.date',
      label: 'Date',
      hasDateFormat: true,
      defaultStyles: {
        'font-family': 'Arimo',
        'font-size': '10px',
        'font-weight': 'normal',
        'color': '#000000',
      },
    },
    {
      selector: '.location',
      label: 'Location',
      defaultStyles: {
        'font-family': 'Arimo',
        'font-size': '10px',
        'font-weight': 'normal',
        'color': '#000000',
      },
    },
    {
      selector: '.description',
      label: 'Description',
      defaultStyles: {
        'font-family': 'Arimo',
        'font-size': '10px',
        'font-weight': 'normal',
        'color': '#000000',
      },
    },
  ],
  certification: [
    {
      selector: '.sectionTitle',
      label: 'Section Title',
      defaultStyles: {
        'font-family': 'Arimo',
        'font-size': '14px',
        'font-weight': 'normal',
        'color': '#000000',
      },
    },
    {
      selector: '.title',
      label: 'Certification Name',
      defaultStyles: {
        'font-family': 'Arimo',
        'font-size': '12px',
        'font-weight': 'bold',
        'color': '#000000',
      },
    },
    {
      selector: '.subtitle',
      label: 'Issuing Organization',
      defaultStyles: {
        'font-family': 'Arimo',
        'font-size': '11px',
        'font-weight': 'normal',
        'color': '#000000',
      },
    },
    {
      selector: '.date',
      label: 'Date',
      hasDateFormat: true,
      defaultStyles: {
        'font-family': 'Arimo',
        'font-size': '10px',
        'font-weight': 'normal',
        'color': '#000000',
      },
    },
    {
      selector: '.credentialId',
      label: 'Credential ID',
      defaultStyles: {
        'font-family': 'Arimo',
        'font-size': '10px',
        'font-weight': 'normal',
        'color': '#666666',
      },
    },
  ],
  language: [
    {
      selector: '.sectionTitle',
      label: 'Section Title',
      defaultStyles: {
        'font-family': 'Arimo',
        'font-size': '14px',
        'font-weight': 'normal',
        'color': '#000000',
      },
    },
    {
      selector: '.languageItem',
      label: 'Language',
      defaultStyles: {
        'font-family': 'Arimo',
        'font-size': '11px',
        'font-weight': 'normal',
        'color': '#000000',
      },
    },
    {
      selector: '.proficiency',
      label: 'Proficiency',
      defaultStyles: {
        'font-family': 'Arimo',
        'font-size': '10px',
        'font-weight': 'normal',
        'color': '#666666',
      },
    },
  ],
  award: [
    {
      selector: '.sectionTitle',
      label: 'Section Title',
      defaultStyles: {
        'font-family': 'Arimo',
        'font-size': '14px',
        'font-weight': 'normal',
        'color': '#000000',
      },
    },
    {
      selector: '.title',
      label: 'Award Title',
      defaultStyles: {
        'font-family': 'Arimo',
        'font-size': '12px',
        'font-weight': 'bold',
        'color': '#000000',
      },
    },
    {
      selector: '.subtitle',
      label: 'Issuer',
      defaultStyles: {
        'font-family': 'Arimo',
        'font-size': '11px',
        'font-weight': 'normal',
        'color': '#000000',
      },
    },
    {
      selector: '.date',
      label: 'Date',
      hasDateFormat: true,
      defaultStyles: {
        'font-family': 'Arimo',
        'font-size': '10px',
        'font-weight': 'normal',
        'color': '#000000',
      },
    },
    {
      selector: '.description',
      label: 'Description',
      defaultStyles: {
        'font-family': 'Arimo',
        'font-size': '10px',
        'font-weight': 'normal',
        'color': '#000000',
      },
    },
  ],
  volunteer: [
    {
      selector: '.sectionTitle',
      label: 'Section Title',
      defaultStyles: {
        'font-family': 'Arimo',
        'font-size': '14px',
        'font-weight': 'normal',
        'color': '#000000',
      },
    },
    {
      selector: '.title',
      label: 'Organization',
      defaultStyles: {
        'font-family': 'Arimo',
        'font-size': '12px',
        'font-weight': 'bold',
        'color': '#000000',
      },
    },
    {
      selector: '.subtitle',
      label: 'Role',
      defaultStyles: {
        'font-family': 'Arimo',
        'font-size': '11px',
        'font-weight': 'normal',
        'color': '#000000',
      },
    },
    {
      selector: '.date',
      label: 'Date',
      hasDateFormat: true,
      defaultStyles: {
        'font-family': 'Arimo',
        'font-size': '10px',
        'font-weight': 'normal',
        'color': '#000000',
      },
    },
    {
      selector: '.location',
      label: 'Location',
      defaultStyles: {
        'font-family': 'Arimo',
        'font-size': '10px',
        'font-weight': 'normal',
        'color': '#000000',
      },
    },
    {
      selector: '.description',
      label: 'Description',
      defaultStyles: {
        'font-family': 'Arimo',
        'font-size': '10px',
        'font-weight': 'normal',
        'color': '#000000',
      },
    },
  ],
  publication: [
    {
      selector: '.sectionTitle',
      label: 'Section Title',
      defaultStyles: {
        'font-family': 'Arimo',
        'font-size': '14px',
        'font-weight': 'normal',
        'color': '#000000',
      },
    },
    {
      selector: '.title',
      label: 'Publication Title',
      defaultStyles: {
        'font-family': 'Arimo',
        'font-size': '12px',
        'font-weight': 'bold',
        'color': '#000000',
      },
    },
    {
      selector: '.subtitle',
      label: 'Publisher',
      defaultStyles: {
        'font-family': 'Arimo',
        'font-size': '11px',
        'font-weight': 'normal',
        'color': '#000000',
      },
    },
    {
      selector: '.date',
      label: 'Date',
      hasDateFormat: true,
      defaultStyles: {
        'font-family': 'Arimo',
        'font-size': '10px',
        'font-weight': 'normal',
        'color': '#000000',
      },
    },
    {
      selector: '.description',
      label: 'Description',
      defaultStyles: {
        'font-family': 'Arimo',
        'font-size': '10px',
        'font-weight': 'normal',
        'color': '#000000',
      },
    },
  ],
};

export const FONT_FAMILIES = [
  { name: 'Arimo', value: 'Arimo' },
  { name: 'Roboto', value: 'Roboto' },
  { name: 'Open Sans', value: 'Open Sans' },
  { name: 'Lato', value: 'Lato' },
  { name: 'Montserrat', value: 'Montserrat' },
  { name: 'Source Sans Pro', value: 'Source Sans Pro' },
  { name: 'Poppins', value: 'Poppins' },
  { name: 'Raleway', value: 'Raleway' },
  { name: 'Merriweather', value: 'Merriweather' },
];

export const FONT_SIZES = [
  { name: '8px', value: '8px' },
  { name: '9px', value: '9px' },
  { name: '10px', value: '10px' },
  { name: '11px', value: '11px' },
  { name: '12px', value: '12px' },
  { name: '14px', value: '14px' },
  { name: '16px', value: '16px' },
  { name: '18px', value: '18px' },
];

export const FONT_WEIGHTS = [
  { name: 'Light', value: '300' },
  { name: 'Normal', value: 'normal' },
  { name: 'Medium', value: '500' },
  { name: 'Semi-Bold', value: '600' },
  { name: 'Bold', value: 'bold' },
];

export const FONT_STYLES = [
  { name: 'Normal', value: 'normal' },
  { name: 'Italic', value: 'italic' },
];

export const TEXT_DECORATIONS = [
  { name: 'None', value: 'none' },
  { name: 'Underline', value: 'underline' },
  { name: 'Line Through', value: 'line-through' },
];

export const TEXT_TRANSFORMS = [
  { name: 'None', value: 'none' },
  { name: 'Uppercase', value: 'uppercase' },
  { name: 'Lowercase', value: 'lowercase' },
  { name: 'Capitalize', value: 'capitalize' },
];

export const TEXT_ALIGNMENTS = [
  { name: 'Left', value: 'left' },
  { name: 'Center', value: 'center' },
  { name: 'Right', value: 'right' },
  { name: 'Justify', value: 'justify' },
];

export const PRESET_COLORS = [
  '#000000',
  '#374151',
  '#10b981',
  '#3b82f6',
  '#8b5cf6',
  '#ec4899',
  '#f59e0b',
  '#ef4444',
  '#06b6d4',
  '#84cc16',
  '#6366f1',
  '#f97316',
  '#666666',
  '#999999',
];

export function getStyleElementsForType(type: string): StyleElement[] {
  return SECTION_STYLE_ELEMENTS[type] || SECTION_STYLE_ELEMENTS.custom;
}
