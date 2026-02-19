import { ipcMain } from 'electron';
import { TemplateService } from '../services/template.js';
import { FormGroupType, CustomTemplate, TemplateStructure, TemplateStyle } from '../types.js';

export function registerTemplateHandlers(): void {
  ipcMain.handle(
    'template:getStructure',
    async (_event, templateName: string, type: FormGroupType): Promise<TemplateStructure> => {
      try {
        return await TemplateService.getStructure(templateName, type);
      } catch (error) {
        console.error(`Failed to get structure for ${templateName}/${type}:`, error);
        throw error;
      }
    }
  );

  ipcMain.handle(
    'template:getStyle',
    async (_event, templateName: string, type: FormGroupType): Promise<TemplateStyle> => {
      try {
        return await TemplateService.getStyle(templateName, type);
      } catch (error) {
        console.error(`Failed to get style for ${templateName}/${type}:`, error);
        throw error;
      }
    }
  );

  ipcMain.handle(
    'template:getDefaultStructure',
    async (_event, templateName: string, type: FormGroupType): Promise<TemplateStructure> => {
      try {
        return await TemplateService.getDefaultStructure(templateName, type);
      } catch (error) {
        console.error(`Failed to get default structure for ${templateName}/${type}:`, error);
        throw error;
      }
    }
  );

  ipcMain.handle(
    'template:getDefaultStyle',
    async (_event, templateName: string, type: FormGroupType): Promise<TemplateStyle> => {
      try {
        return await TemplateService.getDefaultStyle(templateName, type);
      } catch (error) {
        console.error(`Failed to get default style for ${templateName}/${type}:`, error);
        throw error;
      }
    }
  );

  ipcMain.handle(
    'template:saveCustom',
    async (_event, templateName: string, type: FormGroupType, template: CustomTemplate): Promise<void> => {
      try {
        return TemplateService.saveCustomTemplate(templateName, type, template);
      } catch (error) {
        console.error(`Failed to save custom template for ${templateName}/${type}:`, error);
        throw error;
      }
    }
  );

  ipcMain.handle(
    'template:getCustom',
    async (_event, templateName: string, type: FormGroupType): Promise<CustomTemplate | undefined> => {
      try {
        return TemplateService.getCustomTemplate(templateName, type);
      } catch (error) {
        console.error(`Failed to get custom template for ${templateName}/${type}:`, error);
        throw error;
      }
    }
  );

  ipcMain.handle('template:getAvailableTemplates', async (): Promise<string[]> => {
    try {
      return await TemplateService.getAvailableTemplates();
    } catch (error) {
      console.error('Failed to get available templates:', error);
      throw error;
    }
  });

  ipcMain.handle(
    'template:getAvailableComponents',
    async (_event, templateName: string): Promise<FormGroupType[]> => {
      try {
        return await TemplateService.getAvailableComponents(templateName);
      } catch (error) {
        console.error(`Failed to get available components for ${templateName}:`, error);
        throw error;
      }
    }
  );
}
