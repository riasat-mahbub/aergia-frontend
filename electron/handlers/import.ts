import { ipcMain, dialog } from 'electron';
import * as fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
import { PdfParserService } from '../services/pdfParser.js';
import { ResumeParserService } from '../services/resumeParser.js';
import { cvStore, formGroupStore } from '../store.js';
import { TemplateService } from '../services/template.js';
import { CssJsonService } from '../services/cssJson.js';
import { getDefaultDateFormat } from '../services/dateUtils.js';
import { FormGroup } from '../types.js';

export function registerImportHandlers(): void {
  ipcMain.handle('import:fromPdf', async (): Promise<{ success: boolean; cvId?: string; error?: string }> => {
    try {
      // Show file picker
      const result = await dialog.showOpenDialog({
        title: 'Select Resume PDF',
        filters: [{ name: 'PDF Files', extensions: ['pdf'] }],
        properties: ['openFile']
      });
      
      if (result.canceled || result.filePaths.length === 0) {
        return { success: false, error: 'No file selected' };
      }
      
      const filePath = result.filePaths[0];
      const buffer = fs.readFileSync(filePath);
      
      // Parse PDF
      const parsed = await PdfParserService.parsePdf(buffer);
      
      // Create CV
      const now = new Date().toISOString();
      const cvId = uuidv4();
      const cvOrder = cvStore.getMaxOrder() + 1;
      
      const cv = {
        id: cvId,
        title: `Imported Resume ${cvOrder}`,
        template: 'default',
        order: cvOrder,
        createdAt: now,
        updatedAt: now
      };
      
      cvStore.create(cv);
      
      let currentOrder = 1;
      
      // Create Profile FormGroup
      if (parsed.profile) {
        const profileForm = ResumeParserService.createProfileForm(parsed.profile);
        await createFormGroup(cvId, 'profile', 'Profile', currentOrder++, profileForm);
      }
      
      // Create Experience FormGroups
      if (parsed.experience && parsed.experience.length > 0) {
        const experiences = ResumeParserService.createExperienceForms(parsed.experience);
        for (const exp of experiences) {
          await createFormGroup(cvId, 'experience', exp.company || 'Experience', currentOrder++, exp);
        }
      }
      
      // Create Education FormGroups
      if (parsed.education && parsed.education.length > 0) {
        const educations = ResumeParserService.createEducationForms(parsed.education);
        for (const edu of educations) {
          await createFormGroup(cvId, 'education', edu.school || 'Education', currentOrder++, edu);
        }
      }
      
      // Create Skills FormGroups
      if (parsed.skills && parsed.skills.length > 0) {
        const skills = ResumeParserService.createSkillsForms(parsed.skills);
        for (const skill of skills) {
          await createFormGroup(cvId, 'skills', skill.category || 'Skills', currentOrder++, skill);
        }
      }
      
      // Create Certification FormGroups
      if (parsed.certifications && parsed.certifications.length > 0) {
        const certs = ResumeParserService.createCertificationForms(parsed.certifications);
        for (const cert of certs) {
          await createFormGroup(cvId, 'certification', cert.name || 'Certification', currentOrder++, cert);
        }
      }
      
      // Create Custom FormGroup for raw text (fallback)
      if (parsed.rawText) {
        try {
          const customForm = ResumeParserService.createCustomForm(parsed.rawText);
          await createFormGroup(cvId, 'custom', 'Additional Information', currentOrder++, customForm);
        } catch (e) {
          console.log('Failed to create custom section, skipping');
        }
      }
      
      return { success: true, cvId };
      
    } catch (error) {
      console.error('Failed to import PDF:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      };
    }
  });
}

async function createFormGroup(
  cvId: string, 
  type: string, 
  title: string, 
  order: number, 
  data: Record<string, any>
): Promise<void> {
  const id = uuidv4();
  const now = new Date().toISOString();
  
  let structure: Record<string, any> | null = null;
  let style: Record<string, Record<string, string | number>> | null = null;
  
  try {
    structure = await TemplateService.getStructure('default', type as any);
    const templateStyle = await TemplateService.getStyle('default', type as any);
    style = CssJsonService.prefixStyleWithId(templateStyle, `th-${id}`);
  } catch (e) {
    console.error(`Failed to load template for ${type}:`, e);
  }
  
  const formGroup: FormGroup = {
    id,
    title,
    type: type as any,
    cvId,
    order,
    visible: true,
    data: [data],
    structure,
    style,
    dateFormat: getDefaultDateFormat(),
    createdAt: now,
    updatedAt: now
  };
  
  formGroupStore.create(cvId, formGroup);
}
