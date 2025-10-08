import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CV } from '@/types/CvTypes';

interface CvState {
  cvs: CV[];
  loading: boolean;
  lastFetched: number | null;
}

const initialState: CvState = {
  cvs: [],
  loading: false,
  lastFetched: null
};

export const cvSlice = createSlice({
  name: 'cv',
  initialState,
  reducers: {
    setCvs(state, action: PayloadAction<CV[]>) {
      state.cvs = action.payload;
      state.lastFetched = Date.now();
    },
    addCv(state, action: PayloadAction<CV>) {
      state.cvs.push(action.payload);
    },
    removeCv(state, action: PayloadAction<string>) {
      state.cvs = state.cvs.filter(cv => cv.id !== action.payload);
    },
    setCvLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    }
  }
});

export const { setCvs, addCv, removeCv, setCvLoading } = cvSlice.actions;
