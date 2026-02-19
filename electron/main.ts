import { app, BrowserWindow, ipcMain, dialog } from 'electron';
import * as path from 'path';
import * as fs from 'fs';
import { fileURLToPath } from 'url';
import { registerCvHandlers } from './handlers/cv.js';
import { registerFormGroupHandlers } from './handlers/formGroup.js';
import { registerSettingsHandlers } from './handlers/settings.js';
import { registerTemplateHandlers } from './handlers/template.js';
import { registerPdfHandlers } from './handlers/pdf.js';
import { initTemplatesPath } from './services/template.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let mainWindow: BrowserWindow | null = null;

// Log errors to file in production for debugging
function setupErrorLogging() {
  if (app.isPackaged) {
    const logPath = path.join(app.getPath('userData'), 'aergia.log');
    const originalConsoleError = console.error;
    console.error = (...args) => {
      const timestamp = new Date().toISOString();
      const message = `[${timestamp}] ERROR: ${args.join(' ')}\n`;
      fs.appendFileSync(logPath, message);
      originalConsoleError(...args);
    };
    
    // Also log uncaught exceptions
    process.on('uncaughtException', (error) => {
      const timestamp = new Date().toISOString();
      const message = `[${timestamp}] UNCAUGHT EXCEPTION: ${error.message}\n${error.stack}\n`;
      fs.appendFileSync(logPath, message);
    });
    
    process.on('unhandledRejection', (reason, promise) => {
      const timestamp = new Date().toISOString();
      const message = `[${timestamp}] UNHANDLED REJECTION: ${reason}\n`;
      fs.appendFileSync(logPath, message);
    });
  }
}

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
    const indexPath = path.join(__dirname, '../dist/index.html');
    console.log('Loading from:', indexPath);
    console.log('File exists:', fs.existsSync(indexPath));
    mainWindow.loadFile(indexPath).catch(err => {
      console.error('Failed to load index.html:', err);
    });
  } else {
    mainWindow.loadURL('http://localhost:5173');
    mainWindow.webContents.openDevTools();
  }
};

app.whenReady().then(() => {
  setupErrorLogging();
  initTemplatesPath();
  
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
