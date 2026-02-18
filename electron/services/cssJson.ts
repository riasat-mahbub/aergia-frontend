import { TemplateStyle } from '../types.js';

export class CssJsonService {
  static cssToJson(cssString: string): TemplateStyle {
    const cssJson: TemplateStyle = {};

    const cleanCss = cssString.replace(/\/\*[\s\S]*?\*\//g, '').trim();

    const regex = /([^{]+)\{([^}]+)\}/g;
    let match: RegExpExecArray | null;

    while ((match = regex.exec(cleanCss)) !== null) {
      const selector = match[1].trim();
      const declarations = match[2].trim().split(';').filter(Boolean);

      const ruleSet: Record<string, string | number> = {};

      for (const decl of declarations) {
        const colonIndex = decl.indexOf(':');
        if (colonIndex > -1) {
          const property = decl.substring(0, colonIndex).trim();
          const value = decl.substring(colonIndex + 1).trim();
          if (property && value) {
            ruleSet[property] = value;
          }
        }
      }

      if (Object.keys(ruleSet).length > 0) {
        cssJson[selector] = ruleSet;
      }
    }

    return cssJson;
  }

  static jsonToCss(json: TemplateStyle): string {
    let cssString = '';

    for (const selector in json) {
      cssString += `${selector} {\n`;
      const rules = json[selector];
      for (const property in rules) {
        cssString += `  ${property}: ${rules[property]};\n`;
      }
      cssString += `}\n\n`;
    }

    return cssString.trim();
  }

  static prefixStyleWithId(style: TemplateStyle, idPrefix: string): TemplateStyle {
    const prefixed: TemplateStyle = {};

    for (const selector in style) {
      const prefixedSelector = `.${idPrefix} ${selector}`;
      prefixed[prefixedSelector] = { ...style[selector] };
    }

    return prefixed;
  }
}
