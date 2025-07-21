// store/store.ts
import { configureStore } from '@reduxjs/toolkit';
import { settingsSlice } from './settingSlice';
import { formSlice } from './formSlice';

export const store = configureStore({
  reducer: {
    settings: settingsSlice.reducer,
    forms: formSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
