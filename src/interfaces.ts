export interface HotRouteOptions {
  log?: boolean;
  prefetch?: boolean
}

export interface RouteChangeData {
  type: 'link' | 'popstate' | 'noop' | 'disqualified' | 'scroll' | 'go' | string;
  next?: string;
  prev?: string;
}
