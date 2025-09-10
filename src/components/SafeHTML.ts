import DOMPurify from 'dompurify';

export function SafeHTML(html: string) {

  const forbiddenTags = ['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6']
  DOMPurify.addHook('uponSanitizeElement', (node) => {
    const nodeName = node.nodeName.toLowerCase();

    const doc = node.ownerDocument;
    if (!doc) return;
    
    if (forbiddenTags.includes(nodeName)) {
      const parent = node.parentNode;
      if (parent) {
        while (node.firstChild) {
          parent.insertBefore(node.firstChild, node);
        }
        const br = node.ownerDocument.createElement('br');
        parent.insertBefore(br, node);

        if ('remove' in node && typeof node.remove === 'function') {
          node.remove(); 
        } else {
          parent.removeChild(node);
        }
      }
    }

    if (nodeName === 'li') {
      const text = node.textContent || '';
      while (node.firstChild) {
        node.removeChild(node.firstChild);
      }
      node.textContent = text;
    }
  });

  const sanitizedHTML = DOMPurify.sanitize(html, {
    USE_PROFILES: { html: true },
    ALLOWED_TAGS: [
      'strong', 'em', 'u', 's',
      'ul', 'ol', 'li',
      'a', 'span', 'div'
    ],
    ALLOWED_ATTR: ['href', 'target', 'rel', 'class'],
    FORBID_ATTR: ['style'],
  });

  return sanitizedHTML;
}

export default SafeHTML;
