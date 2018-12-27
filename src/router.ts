import { HotRouteOptions, RouteChangeData } from './interfaces';
import { handleLinkClick, handlePopState, scrollToTop } from './handlers';
import { mergeHead, formatNextDocument } from './dom';
import quicklink from 'quicklink';

const defaultOpts = {
  log: false,
  prefetch: true
};

export class Router {
  enabled = true;
  constructor(public opts?: HotRouteOptions) {
    this.opts = { ...defaultOpts, ...opts };

    if (window.history) {
      document.addEventListener('click', e => this.onClick(e));
      window.addEventListener('popstate', e => this.onPop(e));
    } else {
      console.log('hotroute not supported by browser');
    }

    this.prefetch();
  }

  go(path: string) {
    const prev = window.location.href;
    const next = new URL(path, location.origin).href;
    console.log(next, prev)
    return this.replaceDOM({ type: 'go', next, prev  });
  }

  disable() {
    this.enabled = false;
  }

  private prefetch() {
    if (this.opts.prefetch) {
        quicklink();
    }
  }

  private onClick(e: MouseEvent) {
    if (this.enabled) {
      this.replaceDOM(handleLinkClick(e));
    }
  }

  private onPop(e: PopStateEvent) {
    if (this.enabled) {
      this.replaceDOM(handlePopState(e));
    }
  }

  private async replaceDOM({ type, next, prev }: RouteChangeData) {
    if (this.opts.log) {
      console.log('⚡', type);
    }

    // Check type && window href destination
    // Disqualify if fetching same URL

    if (['popstate', 'link', 'go'].includes(type) && next !== prev) {
      if (this.opts.log) {
        console.time('⚡');
      }
      // Get Page
      window.dispatchEvent(new CustomEvent('router:fetch'));
      const html = await fetch(next).then(v => v.text());

      // Merge BODY
      const nextDoc = formatNextDocument(html);
      document.body.innerHTML = nextDoc.body.innerHTML;

      // Merge HEAD
      const nextHead = nextDoc.head;
      const updatedHead = mergeHead(nextHead);

      scrollToTop(type);

      window.dispatchEvent(new CustomEvent('router:end'));

      this.prefetch();

      if (this.opts.log) {
        console.timeEnd('⚡');
      }
      
    }
  }
}
