import { ipcMain } from 'electron';
import { TemplateService } from '../services/template';
import { FormGroupType, CustomTemplate, TemplateStructure, TemplateStyle } from '../types';

export function registerTemplateHandlers(): void {
  ipcMain.handle(
    'template:getStructure',
    async (_event, templateName: string, type: FormGroupType): Promise<TemplateStructure> => {
      return TemplateService.getStructure(templateName, type);
    }
  );

  ipcMain.handle(
    'template:getStyle',
    async (_event, templateName: string, type: FormGroupType): Promise<TemplateStyle> => {
      return TemplateService.getStyle(templateName, type);
    }
  );

  ipcMain.handle(
    'template:getDefaultStructure',
    async (_event, templateName: string, type: FormGroupType): Promise<TemplateStructure> => {
      return TemplateService.getDefaultStructure(templateName, type);
    }
  );

  ipcMain.handle(
    'template:getDefaultStyle',
    async (_event, templateName: string, type: FormGroupType): Promise<TemplateStyle> => {
      return TemplateService.getDefaultStyle(templateName, type);
    }
  );

  ipcMain.handle(
    'template:saveCustom',
    async (_event, templateName: string, type: FormGroupType, template: CustomTemplate): Promise<void> => {
      return TemplateService.saveCustomTemplate(templateName, type, template);
    }
  );

  ipcMain.handle(
    'template:getCustom',
    async (_event, templateName: string, type: FormGroupType): Promise<CustomTemplate | undefined> => {
      return TemplateService.getCustomTemplate(templateName, type);
    }
  );

  ipcMain.handle('template:getAvailableTemplates', async (): Promise<string[]> => {
    return TemplateService.getAvailableTemplates();
  });

  ipcMain.handle(
    'template:getAvailableComponents',
    async (_event, templateName: string): Promise<FormGroupType[]> => {
      return TemplateService.getAvailableComponents(templateName);
    }
  );
}
