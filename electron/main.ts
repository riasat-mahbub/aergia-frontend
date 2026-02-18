import { app, BrowserWindow, ipcMain, dialog } from 'electron';
import * as path from 'path';
import * as fs from 'fs';
import { registerCvHandlers } from './handlers/cv';
import { registerFormGroupHandlers } from './handlers/formGroup';
import { registerSettingsHandlers } from './handlers/settings';
import { registerTemplateHandlers } from './handlers/template';
import { registerPdfHandlers } from './handlers/pdf';

let mainWindow: BrowserWindow | null = null;

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  if (app.isPackaged) {
    mainWindow.loadFile(path.join(__dirname, '../build/index.html'));
  } else {
    mainWindow.loadURL('http://localhost:5173');
    mainWindow.webContents.openDevTools();
  }
};

app.whenReady().then(() => {
  registerCvHandlers();
  registerFormGroupHandlers();
  registerSettingsHandlers();
  registerTemplateHandlers();
  registerPdfHandlers();
  createWindow();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

ipcMain.handle('save-pdf', async (_event, pdfData: Buffer, defaultName: string) => {
  const result = await dialog.showSaveDialog(mainWindow!, {
    title: 'Save PDF',
    defaultPath: defaultName || 'resume.pdf',
    filters: [{ name: 'PDF Files', extensions: ['pdf'] }],
  });

  if (!result.canceled && result.filePath) {
    fs.writeFileSync(result.filePath, pdfData);
    return { success: true, path: result.filePath };
  }
  return { success: false, path: null };
});
