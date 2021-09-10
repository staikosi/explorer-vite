import Vue from 'vue';
import { tokenView } from '@/utils/_';

export default {
  namespaced: true,
  state() {
    return {
      pageSize: 500,
      tokens: [],
      token: {},
      total: 0
    };
  },
  getters: {
    pageNum(state) {
      return Math.ceil(state.total / state.pageSize);
    }
  },
  actions: {
    getTokenInfoList({ state }, pageNum = 0) {
      return Vue.$api
        .request('contract_getTokenInfoList', pageNum, state.pageSize)
        .then(res => {
          state.total = res.totalCount;
          state.tokens = res.tokenInfoList.map(token => {
            token.tokenSymbolView = tokenView(token.tokenSymbol, token.index);
            return token;
          });
        });
    },
    getTokenDetails({ state }, tti) {
      return Vue.$api.request('contract_getTokenInfoById', tti).then(res => {
        res.tokenSymbolView = `${res.tokenSymbol}-${(
          Array(3).join('0') + res.index
        ).slice(-3)}`;
        state.token = res;
      });
    }
  },
  mutations: {}
};
