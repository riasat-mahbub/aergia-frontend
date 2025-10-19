import DOMPurify from 'dompurify';

export function SafeHTML(html: string) {
  const forbiddenTags = ['p', 'h3', 'h4', 'h5', 'h6'];

  DOMPurify.addHook('uponSanitizeElement', (node) => {
    const el = node as HTMLElement; // Cast to HTMLElement
    const nodeName = el.nodeName.toLowerCase();
    const doc = el.ownerDocument;
    if (!doc) return;

    // Flatten forbidden block tags globally
    if (forbiddenTags.includes(nodeName)) {
      const parent = el.parentNode;
      if (parent) {
        while (el.firstChild) {
          parent.insertBefore(el.firstChild, el);
        }
        const br = doc.createElement('br');
        parent.insertBefore(br, el);
        el.remove();
      }
    }

    // Remove <p> inside <li> by flattening
    if (nodeName === 'li') {
      const childNodes = Array.from(el.childNodes);
      childNodes.forEach((child) => {
        if ((child as HTMLElement).nodeName.toLowerCase() === 'p') {
          const childEl = child as HTMLElement;
          while (childEl.firstChild) {
            el.insertBefore(childEl.firstChild, childEl);
          }
          childEl.remove();
        }
      });
      // Inline styles to remove spacing
      el.style.margin = '0';
      el.style.padding = '0';
    }

  });

  const sanitizedHTML = DOMPurify.sanitize(html, {
    USE_PROFILES: { html: true },
    ALLOWED_TAGS: [
      'strong', 'em', 'u', 's',
      'ul', 'ol', 'li',
      'a', 'span', 'div'
    ],
    ALLOWED_ATTR: ['href', 'target', 'rel', 'class', 'style'],
  });

  return sanitizedHTML;
}

export default SafeHTML;
