import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PDFState {
  pdfUrl: string | null;
}

const initialState: PDFState = {
  pdfUrl: null,
};

const pdfSlice = createSlice({
  name: 'pdf',
  initialState,
  reducers: {
    setPdfUrl: (state, action: PayloadAction<string | null>) => {
      state.pdfUrl = action.payload;
    },
  },
});

export const { setPdfUrl } = pdfSlice.actions;
export default pdfSlice.reducer;