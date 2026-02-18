import { ipcMain } from 'electron';
import { settingsStore } from '../store';
import { UserSettings, FormGroupType, CustomTemplate } from '../types';

export function registerSettingsHandlers(): void {
  ipcMain.handle('settings:get', async () => {
    return settingsStore.get();
  });

  ipcMain.handle('settings:updateUser', async (_event, data: Partial<UserSettings>): Promise<UserSettings> => {
    return settingsStore.updateUser(data);
  });
}
