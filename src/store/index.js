import Vue from 'vue';
import Vuex from 'vuex';
import { availableNodes, selectedNode, whichNet } from '@/utils/vite';
import { api } from './plugin';
import * as mutations from './mutations';
import snapshot from './modules/snapshot';
import token from './modules/token';
import sbp from './modules/sbp';
import account from './modules/account';
import { set, get } from '@/utils/storage';

Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [api],
  state: {
    nodes: availableNodes(JSON.parse(get('NODES'))),
    node: selectedNode(JSON.parse(get('NODES'))),
    // current snapshot chain height
    height: '',
    nodeNet: whichNet()
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
    }
  },
  modules: {
    snapshot,
    token,
    sbp,
    account
  }
});
