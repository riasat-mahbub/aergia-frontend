import { ResumeForm } from "@/types/ResumeFormTypes";

interface TemplateNode {
  type: string;
  style?: string;
  bind?: string;
  textbind?: string;
  if?: string;
  children?: TemplateNode[];
  source?: string;
  template?: TemplateNode;
  visible?: boolean;
}

export class TemplateRenderer {
  private static getValue(path: string, data: any, locals: Record<string, any> = {}): any {
    if (!path) return undefined;
    
    const trimmed = path.trim();
    
    if (trimmed.startsWith('data.')) {
      return this.getPath(data, trimmed.slice(5));
    }
    
    const firstDot = trimmed.indexOf('.');
    if (firstDot !== -1) {
      const first = trimmed.slice(0, firstDot);
      const rest = trimmed.slice(firstDot + 1);
      if (locals.hasOwnProperty(first)) {
        return this.getPath(locals[first], rest);
      }
    } else {
      if (locals.hasOwnProperty(trimmed)) {
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
  
  private static evaluateCondition(condition: string, data: any, locals: Record<string, any> = {}): boolean {
    if (!condition) return true;
    
    const tokens = condition.split(/\s+/);
    const evaluated = tokens.map(token => {
      if (token === '&&' || token === '||' || token === '!') return token;
      const value = this.getValue(token, data, locals);
      return value ? 'true' : 'false';
    }).join(' ');
    
    try {
      return eval(evaluated) as boolean;
    } catch {
      return false;
    }
  }

  static renderNode(node: TemplateNode, data: any, locals: Record<string, any> = {}): JSX.Element | null {
    if (!node) return null;
    if (node.visible === false) return null;
    if (node.if && !this.evaluateCondition(node.if, data, locals)) return null;
    
    const className = node.style ? (node.style.startsWith('.') ? node.style.slice(1) : node.style) : '';
    
    switch (node.type) {
      case 'Div': {
        const children = node.children?.map((child, i) => (
          <span key={i}>{this.renderNode(child, data, locals)}</span>
        ));
        if (!children || children.every(c => !c)) return null;
        return <div className={className}>{children}</div>;
      }
        
      case 'Text': {
        const value = this.getValue(node.bind || '', data, locals) || '';
        if (!value) return null;
        return <p className={className}>{String(value)}</p>;
      }
        
      case 'Html': {
        const htmlValue = this.getValue(node.bind || '', data, locals) || '';
        if (!htmlValue || !String(htmlValue).trim()) return null;
        return <div className={className} dangerouslySetInnerHTML={{ __html: String(htmlValue) }} />;
      }
      
      case 'Raw': {
        if (!node.bind) return null;
        return <span className={className}>{node.bind}</span>;
      }
      
      case 'Icon': {
        const iconValue = this.getValue(node.bind || '', data, locals) || '';
        if (!iconValue) return null;
        return <span className={className}>{String(iconValue)}</span>;
      }
        
      case 'Link': {
        const href = this.getValue(node.bind || '', data, locals) || '#';
        if (!href || href === '#') return null;
        const text = node.textbind ? this.getValue(node.textbind, data, locals) : href;
        return <a className={className} href={String(href)}>{String(text)}</a>;
      }
        
      case 'map': {
        const arrayData = this.getValue(node.source || '', data, locals) || [];
        if (!Array.isArray(arrayData)) return null;
        
        const itemName = node.bind || 'item';
        return (
          <>
            {arrayData.map((item, i) => {
              const newLocals = { ...locals, [itemName]: item };
              return <span key={i}>{node.template && this.renderNode(node.template, data, newLocals)}</span>;
            })}
          </>
        );
      }
        
      default:
        return null;
    }
  }

  static renderStructure(structure: TemplateNode, formData: ResumeForm[]): JSX.Element[] {
    if (!structure || !formData) return [];
    
    return formData
      .filter(f => f.visible !== false)
      .map((form, i) => (
        <div key={form.id || i}>
          {this.renderNode(structure, form, {})}
        </div>
      ));
  }
}
