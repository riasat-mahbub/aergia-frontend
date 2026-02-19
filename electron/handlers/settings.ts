import { ipcMain } from 'electron';
import { settingsStore } from '../store.js';
import { UserSettings, FormGroupType, CustomTemplate } from '../types.js';

export function registerSettingsHandlers(): void {
  ipcMain.handle('settings:get', async () => {
    try {
      return settingsStore.get();
    } catch (error) {
      console.error('Failed to get settings:', error);
      throw error;
    }
  });

  ipcMain.handle('settings:updateUser', async (_event, data: Partial<UserSettings>): Promise<UserSettings> => {
    try {
      return settingsStore.updateUser(data);
    } catch (error) {
      console.error('Failed to update user:', error);
      throw error;
    }
  });
}
