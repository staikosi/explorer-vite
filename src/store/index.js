import Vue from 'vue';
import Vuex from 'vuex';
import { settings } from '@/utils/consts';
import { mergeArr } from '@/utils/basic';
import { api } from './plugin';
import * as mutations from './mutations';
import snapshot from './modules/snapshot';
import token from './modules/token';
import sbp from './modules/sbp';
import account from './modules/account';
import { set, get, remove } from '@/utils/storage';

Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [api],
  state: {
    nodes: mergeArr(settings.nodes, JSON.parse(get('NODES')), function key(
      item
    ) {
      return item.url;
    }),
    node: mergeArr(settings.nodes, JSON.parse(get('NODES')), function key(
      item
    ) {
      return item.url;
    }).filter(v => v.selected === true)[0],
    // current snapshot chain height
    height: ''
  },
  actions: {
    getHeight({ rootState }) {
      return Vue.$api.request('ledger_getSnapshotChainHeight').then(height => {
        rootState.height = height;
        return height;
      });
    }
  },
  mutations: {
    [mutations.ADD_NODE](state, node) {
      const nn = Array.from(state.nodes);
      if (nn.filter(v => v.url === node.url).length > 0) {
        return;
      }
      state.nodes.push(node);
      console.log('nodes', state.nodes);
      set('NODES', JSON.stringify(state.nodes));
    },
    [mutations.REMOVE_NODE](state, node) {
      state.nodes.forEach((v, i, arr) => {
        if (!node.selected && v.url === node.url) {
          arr.splice(i, 1);
        }
      });
      set('NODES', JSON.stringify(state.nodes));
    },
    [mutations.SWITCH_NODE](state, node) {
      if (node.selected) {
        return;
      }
      state.nodes.forEach(v => {
        if (v.selected) {
          v.selected = false;
        }
        if (v.url === node.url) {
          v.selected = true;
        }
      });
      state.node = node;
      set('NODES', JSON.stringify(state.nodes));
    },
    [mutations.RESET_NODES](state) {
      if (state.nodes === settings.nodes) {
        return;
      }
      state.nodes = settings.nodes;
      remove('NODES');
    }
  },
  modules: {
    snapshot,
    token,
    sbp,
    account
  }
});
