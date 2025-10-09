import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CV } from "@/types/CvTypes";

interface CvState {
  cvs: CV[];
  selectedCvId: string | null;
  selectedCvTemplate: string | null;
}

const initialState: CvState = {
  cvs: [],
  selectedCvId: null,
  selectedCvTemplate: null,
};

export const cvSlice = createSlice({
  name: "cv",
  initialState,
  reducers: {
    setCvs: (state, action: PayloadAction<CV[]>) => {
      state.cvs = action.payload;
    },
    addCv: (state, action: PayloadAction<CV>) => {
      state.cvs.push(action.payload);
    },
    updateCv: (state, action: PayloadAction<CV>) => {
      const index = state.cvs.findIndex(cv => cv.id === action.payload.id);
      if (index !== -1) {
        state.cvs[index] = { ...state.cvs[index], ...action.payload };
      }
    },
    deleteCv: (state, action: PayloadAction<string>) => {
      state.cvs = state.cvs.filter(cv => cv.id !== action.payload);
    },
    reorderCvs: (state, action: PayloadAction<{ activeId: string; overId: string }>) => {
      const { activeId, overId } = action.payload;
      const oldIndex = state.cvs.findIndex(cv => cv.id === activeId);
      const newIndex = state.cvs.findIndex(cv => cv.id === overId);
      if (oldIndex !== -1 && newIndex !== -1) {
        const [movedCv] = state.cvs.splice(oldIndex, 1);
        state.cvs.splice(newIndex, 0, movedCv);
      }
    },
    setSelectedCvId: (state, action: PayloadAction<string | null>) => {
      state.selectedCvId = action.payload;
    },
    setSelectedCvTemplate: (state, action: PayloadAction<string | null>) => {
      state.selectedCvTemplate = action.payload;
    },
  },
});

export const {
  setCvs,
  addCv,
  updateCv,
  deleteCv,
  reorderCvs,
  setSelectedCvId,
  setSelectedCvTemplate,
} = cvSlice.actions;