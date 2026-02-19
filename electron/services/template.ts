import { app } from 'electron';
import { promises as fs } from 'fs';
import * as path from 'path';
import { CssJsonService } from './cssJson.js';
import { settingsStore } from '../store.js';
import { FormGroupType, TemplateStructure, TemplateStyle, CustomTemplate } from '../types.js';

let templatesPath: string;

export function initTemplatesPath(): void {
  if (app.isPackaged) {
    // In production, templates are in resources/templates (from extraResources)
    templatesPath = path.join(process.resourcesPath, 'templates');
  } else {
    // In development, templates are in electron/templates
    templatesPath = path.join(app.getAppPath(), 'electron', 'templates');
  }
}

export class TemplateService {
  static async getStructure(templateName: string, componentName: FormGroupType): Promise<TemplateStructure> {
    const customTemplate = settingsStore.getCustomTemplate(templateName, componentName);
    if (customTemplate?.structure) {
      return customTemplate.structure;
    }

    // Try specified template folder
    const structurePath = path.join(templatesPath, templateName, 'structure', `${componentName}.json`);
    try {
      const content = await fs.readFile(structurePath, 'utf-8');
      return JSON.parse(content);
    } catch (error: unknown) {
      const err = error as NodeJS.ErrnoException;
      if (err.code !== 'ENOENT') throw error;
    }

    // Fall back to default template
    const defaultPath = path.join(templatesPath, 'default', 'structure', `${componentName}.json`);
    try {
      const content = await fs.readFile(defaultPath, 'utf-8');
      return JSON.parse(content);
    } catch (error: unknown) {
      const err = error as NodeJS.ErrnoException;
      if (err.code === 'ENOENT') {
        throw new Error(`Component ${componentName} not found in template ${templateName} or default`);
      }
      throw error;
    }
  }

  static async getStyle(templateName: string, componentName: FormGroupType): Promise<TemplateStyle> {
    const customTemplate = settingsStore.getCustomTemplate(templateName, componentName);
    if (customTemplate?.style) {
      return customTemplate.style;
    }

    // Try specified template folder
    const stylePath = path.join(templatesPath, templateName, 'style', `${componentName}.css`);
    try {
      const content = await fs.readFile(stylePath, 'utf-8');
      return CssJsonService.cssToJson(content);
    } catch (error: unknown) {
      const err = error as NodeJS.ErrnoException;
      if (err.code !== 'ENOENT') throw error;
    }

    // Fall back to default template
    const defaultPath = path.join(templatesPath, 'default', 'style', `${componentName}.css`);
    try {
      const content = await fs.readFile(defaultPath, 'utf-8');
      return CssJsonService.cssToJson(content);
    } catch (error: unknown) {
      const err = error as NodeJS.ErrnoException;
      if (err.code === 'ENOENT') {
        throw new Error(`Style for ${componentName} not found in template ${templateName} or default`);
      }
      throw error;
    }
  }

  static async getDefaultStructure(templateName: string, componentName: FormGroupType): Promise<TemplateStructure> {
    // Try specified template folder
    const structurePath = path.join(templatesPath, templateName, 'structure', `${componentName}.json`);
    try {
      const content = await fs.readFile(structurePath, 'utf-8');
      return JSON.parse(content);
    } catch (error: unknown) {
      const err = error as NodeJS.ErrnoException;
      if (err.code !== 'ENOENT') throw error;
    }

    // Fall back to default template
    const defaultPath = path.join(templatesPath, 'default', 'structure', `${componentName}.json`);
    try {
      const content = await fs.readFile(defaultPath, 'utf-8');
      return JSON.parse(content);
    } catch (error: unknown) {
      const err = error as NodeJS.ErrnoException;
      if (err.code === 'ENOENT') {
        throw new Error(`Component ${componentName} not found in template ${templateName} or default`);
      }
      throw error;
    }
  }

  static async getDefaultStyle(templateName: string, componentName: FormGroupType): Promise<TemplateStyle> {
    // Try specified template folder
    const stylePath = path.join(templatesPath, templateName, 'style', `${componentName}.css`);
    try {
      const content = await fs.readFile(stylePath, 'utf-8');
      return CssJsonService.cssToJson(content);
    } catch (error: unknown) {
      const err = error as NodeJS.ErrnoException;
      if (err.code !== 'ENOENT') throw error;
    }

    // Fall back to default template
    const defaultPath = path.join(templatesPath, 'default', 'style', `${componentName}.css`);
    try {
      const content = await fs.readFile(defaultPath, 'utf-8');
      return CssJsonService.cssToJson(content);
    } catch (error: unknown) {
      const err = error as NodeJS.ErrnoException;
      if (err.code === 'ENOENT') {
        throw new Error(`Style for ${componentName} not found in template ${templateName} or default`);
      }
      throw error;
    }
  }

  static saveCustomTemplate(templateName: string, componentName: FormGroupType, template: CustomTemplate): void {
    settingsStore.saveCustomTemplate(templateName, componentName, template);
  }

  static getCustomTemplate(templateName: string, componentName: FormGroupType): CustomTemplate | undefined {
    return settingsStore.getCustomTemplate(templateName, componentName);
  }

  static async getAvailableTemplates(): Promise<string[]> {
    try {
      const entries = await fs.readdir(templatesPath, { withFileTypes: true });
      return entries
        .filter(entry => entry.isDirectory())
        .map(entry => entry.name);
    } catch {
      return ['MIT'];
    }
  }

  static async getAvailableComponents(templateName: string): Promise<FormGroupType[]> {
    const structurePath = path.join(templatesPath, templateName, 'structure');
    try {
      const files = await fs.readdir(structurePath);
      return files
        .filter(file => file.endsWith('.json'))
        .map(file => file.replace('.json', '') as FormGroupType);
    } catch {
      return [];
    }
  }
}
