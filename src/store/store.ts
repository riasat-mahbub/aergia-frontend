// store/store.ts
import { configureStore } from '@reduxjs/toolkit';
import { settingsSlice } from './settingSlice';
import { formSlice } from './formSlice';
// import { authSlice } from './authSlice'; // Commented out for Electron - preserved for future cloud login
import pdfReducer from './pdfSlice';
import { cvSlice } from './cvsSlice';

export const store = configureStore({
  reducer: {
    settings: settingsSlice.reducer,
    forms: formSlice.reducer,
    // auth: authSlice.reducer, // Commented out for Electron
    pdf: pdfReducer,
    cv: cvSlice.reducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
