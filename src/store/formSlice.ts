import { createFormHolder } from "@/constants/formHolders";
import { FormHolder } from "@/types/FormHolderTypes";
import { ResumeForm } from "@/types/ResumeFormTypes";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface selectedForm{
  formHolderId: string;
  form: ResumeForm;
}

interface FormState {
  formHolders: FormHolder[];
  selectedForm: selectedForm | null;
  selectedCvId: string | null;
  selectedCvTemplate: string | null;
}

export const initialFormState: FormState = {
  formHolders: [],
  selectedForm: null,
  selectedCvId: null,
  selectedCvTemplate: null
};

export const formSlice = createSlice({
  name: "forms",
  initialState: initialFormState,
  reducers: {
    setFormHolders: (state, action: PayloadAction<FormHolder[]>) => {
      state.formHolders = action.payload;
    },
    reorderFormHolders: (state, action: PayloadAction<{activeId: string, overId: string}>) => {
      const { activeId, overId } = action.payload;
      const oldIndex = state.formHolders.findIndex(holder => holder.id === activeId);
      const newIndex = state.formHolders.findIndex(holder => holder.id === overId);
      
      if (oldIndex !== -1 && newIndex !== -1) {
        const [movedItem] = state.formHolders.splice(oldIndex, 1);
        state.formHolders.splice(newIndex, 0, movedItem);
      }
    },
    setFormHolderToShow: (state, action: PayloadAction<string>) => {
      const formHolder = state.formHolders.find((holder) => holder.id === action.payload);
      if (formHolder) {
        formHolder.visible = !formHolder.visible
      }
    },
    deleteFormHolder: (state, action: PayloadAction<string>) => {
      state.formHolders = state.formHolders.filter((holder) => holder.id !== action.payload);
    },
    addFormHolder: (state, action: PayloadAction<{formHolderTitle:string, formHolderIcon:string, formHolderType:string, formHolderData:ResumeForm[], formHolderStyle:object}>) => {
      const newFormHolder = createFormHolder(
        action.payload.formHolderTitle,
        action.payload.formHolderIcon,
        action.payload.formHolderType,
        action.payload.formHolderData,
        action.payload.formHolderStyle,
      );
      state.formHolders.push(newFormHolder);
    },
    updateFormHolder: (state, action: PayloadAction<FormHolder>) => {
      const index = state.formHolders.findIndex((holder) => holder.id === action.payload.id);
      if (index !== -1) {
        state.formHolders[index] = {...state.formHolders[index], ...action.payload}
      }
    },
    updateFormHolderData: (state, action: PayloadAction<{ formHolderId: string; data: ResumeForm[] }>) => {
      const holderIndex = state.formHolders.findIndex(
        (holder) => holder.id === action.payload.formHolderId
      );
      if (holderIndex !== -1) {
        state.formHolders[holderIndex].data = action.payload.data;
      }
    },
    addForm: (state, action: PayloadAction<{formHolderId: string, form: ResumeForm}>) => {
      const holderIndex = state.formHolders.findIndex((holder) => holder.id === action.payload.formHolderId);
      if (holderIndex !== -1) {
        state.formHolders[holderIndex].data.push(action.payload.form);
      }
    },
    updateForm: (state, action: PayloadAction<{formHolderId: string, form: ResumeForm}>) => {
      const holderIndex = state.formHolders.findIndex((holder) => holder.id === action.payload.formHolderId);
      if (holderIndex !== -1) {
        const formIndex = state.formHolders[holderIndex].data.findIndex(
          (form) => form.id === action.payload.form.id
        );
        if (formIndex !== -1) {
          state.formHolders[holderIndex].data[formIndex] = action.payload.form;
        }
      }
    },
    deleteForm: (state, action: PayloadAction<{formHolderId: string, formId: string}>) => {
      const holderIndex = state.formHolders.findIndex((holder) => holder.id === action.payload.formHolderId);
      if (holderIndex !== -1) {
        state.formHolders[holderIndex].data = state.formHolders[holderIndex].data.filter(
          (form) => form.id !== action.payload.formId
        );
      }
    },
    setFormToShow(state, action: PayloadAction<{formHolderId: string, formId: string}>){
      const holderIndex = state.formHolders.findIndex((holder) => holder.id === action.payload.formHolderId);
      if (holderIndex !== -1) {
        const formIndex  = state.formHolders[holderIndex].data.findIndex(
          (form) => form.id === action.payload.formId
        );
        if(formIndex !== -1){
          state.formHolders[holderIndex].data[formIndex].visible = !state.formHolders[holderIndex].data[formIndex].visible
        }
      }
    },
    reorderForms(state, action: PayloadAction<{formHolderId: string, activeId: string, overId: string}>){
      const { formHolderId, activeId, overId } = action.payload;
      const holderIndex = state.formHolders.findIndex((holder) => holder.id === formHolderId);
      
      if (holderIndex !== -1) {
        const oldIndex = state.formHolders[holderIndex].data.findIndex(form => form.id === activeId);
        const newIndex = state.formHolders[holderIndex].data.findIndex(form => form.id === overId);
        
        if (oldIndex !== -1 && newIndex !== -1) {
          const [movedItem] = state.formHolders[holderIndex].data.splice(oldIndex, 1);
          state.formHolders[holderIndex].data.splice(newIndex, 0, movedItem);
        }
      }
    },
    setSelectedForm(state, action: PayloadAction<{formHolderId: string, form: ResumeForm} | null>){
      state.selectedForm = action.payload;
    },
    setCvId(state, action: PayloadAction<string | null>){
      state.selectedCvId = action.payload;
    },
    setCvTemplate(state, action: PayloadAction<string | null>){
      state.selectedCvTemplate = action.payload;
    }
  },
});

export const {
  setFormHolders,
  setFormHolderToShow,
  deleteFormHolder,
  addFormHolder,
  updateFormHolder,
  updateFormHolderData,
  addForm,
  updateForm,
  deleteForm,
  setFormToShow,
  reorderFormHolders,
  reorderForms,
  setSelectedForm,
  setCvId,
  setCvTemplate
} = formSlice.actions;

// Selectors
export const getFormById = (state: { forms: FormState }, formHolderId: string, formId: string) => {
  const formHolder = state.forms.formHolders.find((holder) => holder.id === formHolderId);
  if (!formHolder) return undefined;
  
  return formHolder.data.find((form) => form.id === formId);
};

export const getFormHolderById = (state: { forms: FormState }, formHolderId: string) => {
  return state.forms.formHolders.find((holder) => holder.id === formHolderId);
};