import { ipcMain } from 'electron';
import { v4 as uuidv4 } from 'uuid';
import { cvStore, formGroupStore } from '../store';
import { TemplateService, initTemplatesPath } from '../services/template';
import { CssJsonService } from '../services/cssJson';
import { CV, CreateCVData, UpdateCVData, ReorderData, FormGroup } from '../types';

export function registerCvHandlers(): void {
  initTemplatesPath();

  ipcMain.handle('cv:getAll', async (): Promise<{ cvs: CV[] }> => {
    const cvs = cvStore.getAll();
    return { cvs };
  });

  ipcMain.handle('cv:create', async (_event, data: CreateCVData): Promise<{ message: string; data: CV }> => {
    const now = new Date().toISOString();
    const id = uuidv4();
    const order = cvStore.getMaxOrder() + 1;
    
    const cv: CV = {
      id,
      title: data.title,
      template: data.template || 'MIT',
      order,
      createdAt: now,
      updatedAt: now,
    };
    
    cvStore.create(cv);
    
    const profileId = uuidv4();
    const profileOrder = 1;
    let structure: Record<string, any> | null = null;
    let style: Record<string, Record<string, string | number>> | null = null;
    
    try {
      structure = await TemplateService.getStructure(cv.template, 'profile');
      const templateStyle = await TemplateService.getStyle(cv.template, 'profile');
      style = CssJsonService.prefixStyleWithId(templateStyle, `th-${profileId}`);
    } catch (error) {
      console.error('Failed to load profile template:', error);
    }
    
    const profileFormGroup: FormGroup = {
      id: profileId,
      title: 'Profile',
      type: 'profile',
      cvId: id,
      order: profileOrder,
      visible: true,
      data: [],
      structure,
      style,
      createdAt: now,
      updatedAt: now,
    };
    
    formGroupStore.create(id, profileFormGroup);
    
    return {
      message: 'CV created successfully',
      data: {
        title: cv.title,
        id: cv.id,
        template: cv.template,
        createdAt: cv.createdAt,
        updatedAt: cv.updatedAt,
        order: cv.order,
      },
    };
  });

  ipcMain.handle('cv:get', async (_event, id: string): Promise<{ message: string; data: CV } | null> => {
    const cv = cvStore.getById(id);
    if (!cv) {
      return null;
    }
    return {
      message: 'CV found successfully',
      data: cv,
    };
  });

  ipcMain.handle('cv:update', async (_event, id: string, data: UpdateCVData): Promise<{ cv: CV } | null> => {
    const cv = cvStore.update(id, data);
    if (!cv) {
      return null;
    }
    return { cv };
  });

  ipcMain.handle('cv:delete', async (_event, id: string): Promise<{ message: string } | null> => {
    const deleted = cvStore.delete(id);
    if (!deleted) {
      return null;
    }
    return { message: 'CV deleted successfully' };
  });

  ipcMain.handle('cv:reorder', async (_event, data: ReorderData): Promise<{ message: string } | null> => {
    const reordered = cvStore.reorder(data.activeId, data.overId);
    if (!reordered) {
      return null;
    }
    return { message: 'Reordered Successfully' };
  });
}
