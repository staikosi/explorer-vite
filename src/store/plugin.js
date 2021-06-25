import Vue from 'vue';
import Api from '@/api';
import { log } from '@/utils/log';

export const api = (store) => {
  const _ = (node) => {
    if (!node) return;
    log(`node`, node.url);
    const api = new Api(node.url);
    Vue.prototype.$api = api;
    Vue.$api = api;
  };
  _(store.state.node);

  store.subscribe(({ type, payload }) => {
    if (type === 'SWITCH_NODE') {
      _(payload);
    }
  });
};
