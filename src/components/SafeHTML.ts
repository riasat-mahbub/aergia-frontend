import React from 'react';
import DOMPurify from 'dompurify';

export function SafeHTML(html: string) {
  const sanitizedHTML = DOMPurify.sanitize(html, {
    USE_PROFILES: { html: true },
    ALLOWED_TAGS: [
      'p', 'br', 'strong', 'em', 'u', 's',
      'ul', 'ol', 'li',
      'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
      'a', 'span', 'div'
    ],
    ALLOWED_ATTR: ['href', 'target', 'rel', 'class', 'style']
  });

  const parser = new DOMParser();
  const doc = parser.parseFromString(sanitizedHTML, 'text/html');

  doc.querySelectorAll('li').forEach(li => {
    li.innerHTML = li.textContent || '';
  });

  return doc.body.innerHTML;
}

export default SafeHTML;
