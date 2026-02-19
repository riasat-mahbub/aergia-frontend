import { ipcMain } from 'electron';
import { v4 as uuidv4 } from 'uuid';
import { formGroupStore, cvStore } from '../store.js';
import { TemplateService } from '../services/template.js';
import { CssJsonService } from '../services/cssJson.js';
import { SanitizationService } from '../services/sanitization.js';
import { getDefaultDateFormat } from '../services/dateUtils.js';
import { FormGroup, CreateFormGroupData, UpdateFormGroupData, ReorderData, FormGroupType } from '../types.js';

export function registerFormGroupHandlers(): void {
  ipcMain.handle('formGroup:getAll', async (_event, cvId: string): Promise<{ formHolders: FormGroup[] }> => {
    try {
      const formGroups = formGroupStore.getAll(cvId);
      return { formHolders: formGroups };
    } catch (error) {
      console.error(`Failed to get form groups for CV ${cvId}:`, error);
      throw error;
    }
  });

  ipcMain.handle(
    'formGroup:create',
    async (_event, cvId: string, data: CreateFormGroupData): Promise<{ formGroup: FormGroup } | { message: string; error: string }> => {
      try {
        const cv = cvStore.getById(cvId);
        if (!cv) {
          return { message: 'Failed to create form group', error: 'CV not found' };
        }

        const now = new Date().toISOString();
        const id = uuidv4();
        const order = formGroupStore.getMaxOrder(cvId) + 1;
        
        let structure: Record<string, any> | null = null;
        let style: Record<string, Record<string, string | number>> | null = null;

        try {
          structure = await TemplateService.getStructure(cv.template, data.type as FormGroupType);
          const templateStyle = await TemplateService.getStyle(cv.template, data.type as FormGroupType);
          style = CssJsonService.prefixStyleWithId(templateStyle, `th-${id}`);
        } catch (error) {
          const err = error as Error;
          console.error('Failed to load template:', err.message);
        }

        const sanitizedData = data.data ? SanitizationService.sanitizeData(data.data) : [];

        const formGroup: FormGroup = {
          id,
          title: data.title,
          type: data.type as FormGroupType,
          cvId,
          order,
          visible: true,
          data: sanitizedData as Record<string, any>[],
          structure,
          style,
          dateFormat: getDefaultDateFormat(),
          createdAt: now,
          updatedAt: now,
        };

        formGroupStore.create(cvId, formGroup);

        return { formGroup };
      } catch (error) {
        console.error(`Failed to create form group for CV ${cvId}:`, error);
        throw error;
      }
    }
  );

  ipcMain.handle(
    'formGroup:get',
    async (_event, cvId: string, id: string): Promise<{ formGroup: FormGroup } | null> => {
      try {
        const formGroup = formGroupStore.getById(cvId, id);
        if (!formGroup) {
          return null;
        }
        return { formGroup };
      } catch (error) {
        console.error(`Failed to get form group ${id}:`, error);
        throw error;
      }
    }
  );

  ipcMain.handle(
    'formGroup:update',
    async (_event, cvId: string, id: string, data: UpdateFormGroupData): Promise<{ formGroup: FormGroup } | null> => {
      try {
        const updateData: Partial<FormGroup> = {};

        if (data.title !== undefined) {
          updateData.title = data.title;
        }
        if (data.type !== undefined) {
          updateData.type = data.type;
        }
        if (data.visible !== undefined) {
          updateData.visible = data.visible;
        }
        if (data.order !== undefined) {
          updateData.order = data.order;
        }
        if (data.data !== undefined) {
          updateData.data = SanitizationService.sanitizeData(data.data) as Record<string, any>[];
        }
        if (data.style !== undefined) {
          updateData.style = data.style as Record<string, Record<string, string | number>>;
        }
        if (data.dateFormat !== undefined) {
          updateData.dateFormat = data.dateFormat;
        }

        const formGroup = formGroupStore.update(cvId, id, updateData);
        if (!formGroup) {
          return null;
        }
        return { formGroup };
      } catch (error) {
        console.error(`Failed to update form group ${id}:`, error);
        throw error;
      }
    }
  );

  ipcMain.handle(
    'formGroup:delete',
    async (_event, cvId: string, id: string): Promise<{ message: string } | null> => {
      try {
        const deleted = formGroupStore.delete(cvId, id);
        if (!deleted) {
          return null;
        }
        return { message: 'Form Group deleted successfully' };
      } catch (error) {
        console.error(`Failed to delete form group ${id}:`, error);
        throw error;
      }
    }
  );

  ipcMain.handle(
    'formGroup:reorder',
    async (_event, cvId: string, data: ReorderData): Promise<{ message: string } | null> => {
      try {
        const reordered = formGroupStore.reorder(cvId, data.activeId, data.overId);
        if (!reordered) {
          return null;
        }
        return { message: 'Reordered Successfully' };
      } catch (error) {
        console.error('Failed to reorder form groups:', error);
        throw error;
      }
    }
  );
}
