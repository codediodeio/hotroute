import { Router } from './router';
import { HotRouteOptions } from './interfaces';


export default (opts?: HotRouteOptions) => {
  const router = new Router(opts);
  console.log('⚡ Blue 42 Hot Route ⚡')
  return router;
}
