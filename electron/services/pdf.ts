import { BrowserWindow } from 'electron';
import { formGroupStore, cvStore } from '../store.js';
import { TemplateService } from './template.js';
import { CssJsonService } from './cssJson.js';
import { formatDateRange, getDefaultDateFormat } from './dateUtils.js';
import { FormGroup, TemplateStructure, TemplateStyle, DateFormat } from '../types.js';

interface RenderContext {
  dateFormat: DateFormat;
}

export class PdfService {
  static async generatePdf(cvId: string): Promise<Buffer | null> {
    const cv = cvStore.getById(cvId);
    if (!cv) {
      return null;
    }

    const formGroups = formGroupStore.getAll(cvId);
    const html = await this.generateHtml(formGroups, cv.template);

    const win = new BrowserWindow({
      width: 800,
      height: 1100,
      show: false,
      webPreferences: {
        nodeIntegration: false,
        contextIsolation: true,
      },
    });

    try {
      await win.loadURL(`data:text/html;charset=utf-8,${encodeURIComponent(html)}`);
      
      const pdf = await win.webContents.printToPDF({
        pageSize: 'A4',
        printBackground: true,
        margins: {
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          marginType: 'default',
        },
      });

      return Buffer.from(pdf);
    } finally {
      win.close();
    }
  }

  private static async generateHtml(formGroups: FormGroup[], template: string): Promise<string> {
    const styles = await this.generateStyles(formGroups, template);
    const content = await this.generateContent(formGroups, template);

    return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <link href="https://fonts.googleapis.com/css2?family=Arimo:wght@400;600;700&family=Roboto:wght@400;500;700&family=Open+Sans:wght@400;600;700&family=Lato:wght@400;700&family=Montserrat:wght@400;600;700&family=Source+Sans+Pro:wght@400;600;700&family=Raleway:wght@400;600;700&family=Poppins:wght@400;600;700&family=Nunito:wght@400;600;700&family=PT+Sans:wght@400;700&family=Inter:wght@400;600;700&family=Playfair+Display:wght@400;700&family=Merriweather:wght@400;700&family=Ubuntu:wght@400;700&family=Crimson+Text:wght@400;700&family=Libre+Baskerville:wght@400;700&family=Oswald:wght@400;700&family=Fira+Sans:wght@400;600;700&family=Work+Sans:wght@400;600;700&family=Noto+Sans:wght@400;700&family=Roboto+Slab:wght@400;700&family=Quicksand:wght@400;600;700&family=Karla:wght@400;700&family=Rubik:wght@400;600;700&family=DM+Sans:wght@400;500;700&display=swap" rel="stylesheet">
          <style>${styles}</style>
        </head>
        <body>
          ${content}
        </body>
      </html>
    `;
  }

  private static async generateStyles(formGroups: FormGroup[], template: string): Promise<string> {
    let styles = this.getTailwindReset();

    for (const formGroup of formGroups) {
      if (formGroup.style) {
        const cssContent = CssJsonService.jsonToCss(formGroup.style);
        styles += cssContent + '\n';
      } else {
        try {
          const styleJson = await TemplateService.getStyle(template, formGroup.type);
          const cssContent = CssJsonService.jsonToCss(styleJson);
          styles += cssContent + '\n';
        } catch {
          // Skip if template style not found
        }
      }
    }

    return styles;
  }

  private static async generateContent(formGroups: FormGroup[], template: string): Promise<string> {
    let content = '';

    for (const formGroup of formGroups.filter(fg => fg.visible !== false)) {
      // Always use template structure for consistent rendering with preview
      // This ensures Date nodes and other template updates are reflected
      let structure: TemplateStructure | null = null;
      try {
        structure = await TemplateService.getStructure(template, formGroup.type);
      } catch {
        // Fall back to stored structure if template not found
        structure = formGroup.structure as TemplateStructure | null;
        if (!structure) continue;
      }

      const formData = formGroup.data || [];
      const dateFormat = formGroup.dateFormat || getDefaultDateFormat();

      content += `<div class="th-${formGroup.id}">`;
      if (formGroup.type !== 'profile') {
        content += `<p class="sectionTitle">${this.escapeHtml(formGroup.title)}</p>`;
      }
      content += this.renderStructure(structure, formData, dateFormat);
      content += '</div>';
    }

    return content;
  }

  private static renderStructure(structure: TemplateStructure, formData: Record<string, any>[], dateFormat: DateFormat): string {
    if (!structure || !formData) return '';

    const context: RenderContext = { dateFormat };

    let html = '';

    for (const form of formData.filter(f => f.visible !== false)) {
      html += this.renderNode(structure, form, {}, context);
    }

    return html;
  }

  private static renderNode(
    node: TemplateStructure,
    data: Record<string, any>,
    locals: Record<string, any> = {},
    context: RenderContext = { dateFormat: getDefaultDateFormat() }
  ): string {
    if (!node) return '';
    if (node.visible === false) return '';
    if (node.if && !this.evaluateCondition(node.if, data, locals)) return '';

    const className = node.style ? (node.style.startsWith('.') ? node.style.slice(1) : node.style) : '';

    switch (node.type) {
      case 'Div': {
        let content = '';
        if (node.children) {
          for (const child of node.children) {
            content += this.renderNode(child, data, locals, context);
          }
        }
        if (!content.trim()) return '';
        return `<div class="${className}">${content}</div>`;
      }

      case 'Text': {
        const value = this.getValue(node.bind || '', data, locals) || '';
        if (!value) return '';
        return `<p class="${className}">${this.escapeHtml(String(value))}</p>`;
      }

      case 'Date': {
        const startDate = this.getValue((node as any).startDate || '', data, locals) || '';
        const endDate = this.getValue((node as any).endDate || '', data, locals) || '';
        const isCurrent = this.getValue((node as any).isCurrent || '', data, locals) || false;
        
        if (!startDate && !endDate) return '';
        
        const formattedDate = formatDateRange(
          startDate, 
          endDate, 
          context.dateFormat,
          Boolean(isCurrent)
        );
        return `<p class="${className}">${this.escapeHtml(formattedDate)}</p>`;
      }

      case 'Html': {
        const htmlValue = this.getValue(node.bind || '', data, locals) || '';
        if (!htmlValue.trim()) return '';
        return `<div class="${className}">${htmlValue}</div>`;
      }

      case 'Raw': {
        if (!node.bind) return '';
        return `<span class="${className}">${this.escapeHtml(node.bind)}</span>`;
      }

      case 'Icon': {
        const iconValue = this.getValue(node.bind || '', data, locals) || '';
        if (!iconValue) return '';
        return `<span class="${className}">${this.escapeHtml(String(iconValue))}</span>`;
      }

      case 'Link': {
        const href = this.getValue(node.bind || '', data, locals) || '#';
        if (!href || href === '#') return '';
        const text = node.textbind ? this.getValue(node.textbind, data, locals) : href;
        return `<a class="${className}" href="${this.escapeHtml(String(href))}">${this.escapeHtml(String(text))}</a>`;
      }

      case 'map': {
        const arrayData = this.getValue(node.source || '', data, locals) || [];
        if (!Array.isArray(arrayData)) return '';

        let mapContent = '';
        const itemName = node.bind || 'item';
        for (const item of arrayData) {
          const newLocals = { ...locals, [itemName]: item };
          if (node.template) {
            mapContent += this.renderNode(node.template, data, newLocals, context);
          }
        }
        return mapContent;
      }

      default:
        return '';
    }
  }

  private static getValue(path: string, data: Record<string, any>, locals: Record<string, any> = {}): any {
    if (!path) return undefined;

    const trimmed = path.trim();

    if (trimmed.startsWith('data.')) {
      return this.getPath(data, trimmed.slice(5));
    }

    const firstDot = trimmed.indexOf('.');
    if (firstDot !== -1) {
      const first = trimmed.slice(0, firstDot);
      const rest = trimmed.slice(firstDot + 1);
      if (Object.prototype.hasOwnProperty.call(locals, first)) {
        return this.getPath(locals[first], rest);
      }
    } else {
      if (Object.prototype.hasOwnProperty.call(locals, trimmed)) {
        return locals[trimmed];
      }
    }

    return this.getPath(data, trimmed);
  }

  private static getPath(obj: any, path: string): any {
    if (!obj || !path) return undefined;

    const parts = path.split('.');
    let current = obj;

    for (const part of parts) {
      if (current == null) return undefined;
      current = current[part];
    }

    return current;
  }

  private static evaluateCondition(condition: string, data: Record<string, any>, locals: Record<string, any> = {}): boolean {
    if (!condition) return true;

    const tokens = condition.split(/\s+/);
    const evaluated = tokens
      .map(token => {
        if (token === '&&' || token === '||' || token === '!') return token;
        const value = this.getValue(token, data, locals);
        return value ? 'true' : 'false';
      })
      .join(' ');

    try {
      return eval(evaluated) as boolean;
    } catch {
      return false;
    }
  }

  private static escapeHtml(text: string): string {
    const map: Record<string, string> = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;',
    };
    return text.replace(/[&<>"']/g, m => map[m]);
  }

  private static getTailwindReset(): string {
    return `
      *, ::before, ::after {
        box-sizing: border-box;
        border-width: 0;
        border-style: solid;
        border-color: currentColor;
      }
      
      html {
        line-height: 1.5;
        -webkit-text-size-adjust: 100%;
        -moz-tab-size: 4;
        tab-size: 4;
        font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
        font-feature-settings: normal;
        font-variation-settings: normal;
      }
      
      body {
        margin: 0;
        line-height: inherit;
        font-family: Arial, Helvetica, sans-serif;
        padding: 32px;
      }
      
      hr {
        height: 0;
        color: inherit;
        border-top-width: 1px;
      }
      
      h1, h2, h3, h4, h5, h6 {
        font-size: inherit;
        font-weight: inherit;
      }
      
      a {
        color: inherit;
        text-decoration: inherit;
      }
      
      b, strong {
        font-weight: bolder;
      }
      
      p {
        margin: 0;
      }
      
      ul, ol {
        list-style: none;
        margin: 0;
        padding: 0;
      }
      
      .sectionTitle {
        font-family: 'Arimo', Arial, sans-serif;
        color: black;
        font-size: 14px;
        font-weight: normal;
        margin-right: 10px;
        margin-bottom: 8px;
        border-bottom: 1px solid black;
      }
    `;
  }
}
