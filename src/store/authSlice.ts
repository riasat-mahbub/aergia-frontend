// Auth slice - commented out for Electron desktop app
// Preserved for future cloud login functionality

// import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

// interface AuthState {
//   isLoggedIn: boolean;
//   loading: boolean;
// }

// export const initialAuthState: AuthState = {
//   isLoggedIn: false,
//   loading: true,
// };

// export const authSlice = createSlice({
//   name: "auth",
//   initialState: initialAuthState,
//   reducers: {
//     setIsLoggedIn: (state, action: PayloadAction<boolean>) => {
//       state.isLoggedIn = action.payload;
//       state.loading = false;
//     },
//     setAuthLoading: (state, action: PayloadAction<boolean>) => {
//       state.loading = action.payload;
//     },
//   },
// });

// export const { setIsLoggedIn, setAuthLoading } = authSlice.actions;