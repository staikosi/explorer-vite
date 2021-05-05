import Vue from 'vue';
import Api from '@/api';
import { log } from '@/utils/log';

export const api = (store) => {
  const _ = (node) => {
    if (!node) return;

    const api = new Api(node);
    log(`api`, api);
    Vue.prototype.$api = api;
    Vue.$api = api;
  };

  _(store.state.node);

  store.subscribe(({ type, payload }) => {
    if (type === 'SET_NODE') {
      _(payload);
    }
  });
};
