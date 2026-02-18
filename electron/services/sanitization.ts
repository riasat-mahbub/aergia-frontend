import DOMPurify from 'dompurify';

export class SanitizationService {
  private static allowedTags = ['b', 'i', 'u', 'strong', 'em', 'p', 'br', 'ul', 'ol', 'li', 'a', 'span'];
  private static allowedAttr = ['href', 'target', 'style'];

  static sanitizeHtml(html: string): string {
    return DOMPurify.sanitize(html, {
      ALLOWED_TAGS: this.allowedTags,
      ALLOWED_ATTR: this.allowedAttr,
      ALLOW_DATA_ATTR: false,
    });
  }

  static sanitizeData(data: unknown): unknown {
    if (typeof data === 'string') {
      return this.sanitizeHtml(data);
    }
    
    if (Array.isArray(data)) {
      return data.map(item => this.sanitizeData(item));
    }
    
    if (data && typeof data === 'object') {
      const sanitized: Record<string, unknown> = {};
      for (const key in data) {
        if (Object.prototype.hasOwnProperty.call(data, key)) {
          sanitized[key] = this.sanitizeData((data as Record<string, unknown>)[key]);
        }
      }
      return sanitized;
    }
    
    return data;
  }
}
