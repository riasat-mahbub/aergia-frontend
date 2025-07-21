import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
// import type { RootState } from "lib/redux/store";

interface Settings {
  themeColor: string;
  fontFamily: string;
  fontSize: string;
  documentSize: string;
  showBulletPoints: {
    educations: boolean;
    projects: boolean;
    skills: boolean;
    custom: boolean;
  };
  expandedFormHolder: string | null;
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
  showBulletPoints: {
    educations: true,
    projects: true,
    skills: true,
    custom: true,
  },
  expandedFormHolder: null
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
    setExpandedFormHolder: (state, action: PayloadAction<string | null>) => {
      state.expandedFormHolder = action.payload;
    },
  },
});

export const {
    setThemeColor,
    setFontFamily,
    setFontSize,
    setExpandedFormHolder
} = settingsSlice.actions;