import Vue from 'vue';
import Vuex from 'vuex';
import { NODE } from '@/utils/consts';
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
    // current node connected
    node: get('NODE') || NODE,
    // current snapshot chain height
    height: '',
    goViteVersion: '',
    priceToBTC: '',
    circulating: ''
  },
  getters: {},
  actions: {
    getHeight({ rootState }) {
      return Vue.$api.request('ledger_getSnapshotChainHeight').then(height => {
        rootState.height = height;
      });
    },
    getGoViteVersion({ rootState }) {
      return fetch(
        'https://api.github.com/repos/vitelabs/go-vite/releases/latest'
      )
        .then(res => res.json())
        .then(data => {
          rootState.goViteVersion = data.tag_name;
        });
    },
    getPriceToBTC({ rootState }) {
      return fetch('https://api.binance.com/api/v3/ticker/price?symbol=VITEBTC')
        .then(res => res.json())
        .then(data => {
          rootState.priceToBTC = data.price;
        });
    }
  },
  mutations: {
    [mutations.SET_NODE](state, node) {
      if (state.node === node) {
        return;
      }
      state.node = node;
      set('NODE', node);
    },
    [mutations.RESET_NODE](state) {
      if (state.node === NODE) {
        return;
      }
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
    sbp,
    account
  }
});
