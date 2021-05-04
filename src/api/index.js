import { ViteAPI } from '@vite/vitejs';
import http from '@vite/vitejs-http';
import { log } from '@/utils/log';

export default class Api extends ViteAPI {
  constructor(node) {
    const service = new http(`${node}`);
    super(service, () => {
      log(`connected to ${node}`);
    });
    this.node = node;
  }
}
