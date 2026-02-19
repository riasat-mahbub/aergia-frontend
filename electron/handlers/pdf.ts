import { ipcMain } from 'electron';
import { PdfService } from '../services/pdf.js';

export function registerPdfHandlers(): void {
  ipcMain.handle('pdf:generate', async (_event, cvId: string): Promise<Buffer | null> => {
    try {
      return await PdfService.generatePdf(cvId);
    } catch (error) {
      console.error(`Failed to generate PDF for CV ${cvId}:`, error);
      throw error;
    }
  });
}
