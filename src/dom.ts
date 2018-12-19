export function formatNextDocument(html: string) {
  var parser = new DOMParser();
  const nextDoc = parser.parseFromString(html, 'text/html');

  // Allow specific elements to be cloned over
  const keep = nextDoc.querySelectorAll('[data-stateful]');

  keep.forEach(node => {
    const cur = document.getElementById(node.id);
    if (cur) {
      node.replaceWith(cur);
    }
  });

  return nextDoc;
}

export function mergeHead(nextHead: HTMLHeadElement) {
  const curHead = document.head;

  const freshNodes = nextHead.querySelectorAll('[data-reload], title, meta');

  freshNodes.forEach(node => {
    let replace;

    if (node.tagName === 'TITLE') {
      replace = curHead.querySelector('title');
    } else if (node.tagName === 'META') {
      const id = node.getAttribute('name');
      replace = curHead.querySelector(`meta[name="${id}"]`);
    } else {
      const id = node.getAttribute('data-reload');
      replace = curHead.querySelector(`[data-reload="${id}"]`);
    }

    if (replace) {
      if (replace.tagName === 'SCRIPT') {
        const newScript = document.createElement('script');
        newScript.src = replace.src;
        newScript.dataset.reload = '';
        replace.replaceWith(newScript);
      } else {
        replace.replaceWith(node);
      }
    } else {
      for (const n of Array.from(document.head.childNodes)) {
        if (n.isEqualNode(node)) return;
      }

      document.head.appendChild(node);
    }
  });

  return curHead;
}
