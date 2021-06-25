import Vue from 'vue';

export default {
  namespaced: true,
  state() {
    return {
      pageSize: 10,
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
            token.tokenSymbolView =
              token.tokenSymbol +
              '-' +
              (Array(3).join('0') + token.index).slice(-3);
            return token;
          });
        });
    },
    getTokenDetails({ state }, tti) {
      return Vue.$api.request('contract_getTokenInfoById', tti).then(res => {
        res.tokenSymbolView =
          res.tokenSymbol + '-' + (Array(3).join('0') + res.index).slice(-3);
        state.token = res;
      });
    }
  },
  mutations: {}
};
