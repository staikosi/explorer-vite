import Vue from 'vue';
import Vuex from 'vuex';
import { NODE } from '@/utils/consts';
import { api } from './plugin';
import * as mutations from './mutations';
import snapshot from './modules/snapshot';
import token from './modules/token';
import sbp from './modules/sbp';
import { set, get, remove } from '@/utils/storage';

Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [api],
  state: {
    // current node connected
    node: get('NODE') || NODE,
    // current snapshot chain height
    height: '',
    goViteVersion: ''
  },
  getters: {},
  actions: {
    getHeight({ rootState }) {
      return Vue.$api
        .request('ledger_getSnapshotChainHeight')
        .then((height) => {
          rootState.height = height;
        });
    }
  },
  mutations: {
    [mutations.SET_NODE](state, node) {
      state.node = node;
      set('NODE', node);
    },
    [mutations.RESET_NODE](state) {
      state.node = NODE;
      remove('NODE');
    },
    [mutations.UPDATE](state, payload) {
      for (let key in payload) {
        state[key] = payload[key];
      }
    }
  },
  modules: {
    snapshot,
    token,
    sbp
  }
});
