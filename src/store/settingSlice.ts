import { emptyCustom } from "@/constants/resumeFormTemplates";
import { ResumeFormBase, ResumeCustom } from "@/types/ResumeFormTypes";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
// import type { RootState } from "lib/redux/store";

interface Settings {
  themeColor: string;
  fontFamily: string;
  fontSize: string;
  documentSize: string;
  forms: [ResumeFormBase, boolean][];
  showBulletPoints: {
    educations: boolean;
    projects: boolean;
    skills: boolean;
    custom: boolean;
  };
}

export const DEFAULT_THEME_COLOR = "#38bdf8"; // sky-400
export const DEFAULT_FONT_FAMILY = "Roboto";
export const DEFAULT_FONT_SIZE = "11"; // text-base https://tailwindcss.com/docs/font-size
export const DEFAULT_FONT_COLOR = "#171717"; // text-neutral-800

export const initialSettings: Settings = {
  themeColor: DEFAULT_THEME_COLOR,
  fontFamily: DEFAULT_FONT_FAMILY,
  fontSize: DEFAULT_FONT_SIZE,
  documentSize: "Letter",
  forms: [[emptyCustom, true]],
  showBulletPoints: {
    educations: true,
    projects: true,
    skills: true,
    custom: true,
  },
};


export const settingsSlice = createSlice({
  name: "settings",
  initialState: initialSettings,
  reducers: {
    setThemeColor: (state, action: PayloadAction<string>) => {
      state.themeColor = action.payload;
    },
    setFontFamily: (state, action: PayloadAction<string>) => {
      state.fontFamily = action.payload;
    },
    setFontSize: (state, action: PayloadAction<string>) => {
      state.fontSize = action.payload;
    },
    setForms: (state, action: PayloadAction<[ResumeFormBase, boolean][]>) => {
      state.forms = action.payload;
    },
    setFormToShow: (state, action: PayloadAction<string>) => {
      const form = state.forms.find((form) => form[0].id === action.payload);
      if (form) {
        // the second one contains visibility
        form[1] = !form[1];
      }
    },
    deleteForm: (state, action: PayloadAction<string>) => {
      state.forms = state.forms.filter((form) => form[0].id !== action.payload);
    },
  },
});

export const {
    setThemeColor,
    setFontFamily,
    setFontSize,
    setFormToShow,
    setForms,
    deleteForm
} = settingsSlice.actions;