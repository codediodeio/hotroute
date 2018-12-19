export { Router } from './router';
import { Router } from './router';
import { HotRouteOptions } from './interfaces';


export function startHotRoute(opts?: HotRouteOptions) {
  const router = new Router(opts);
  console.log('⚡ Blue 42 Hot Route ⚡')
  return router;
}
