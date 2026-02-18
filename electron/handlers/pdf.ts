import { ipcMain } from 'electron';
import { PdfService } from '../services/pdf';

export function registerPdfHandlers(): void {
  ipcMain.handle('pdf:generate', async (_event, cvId: string): Promise<Buffer | null> => {
    return PdfService.generatePdf(cvId);
  });
}
