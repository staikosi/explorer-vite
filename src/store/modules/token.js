import Vue from 'vue';

export default {
  namespaced: true,
  state() {
    return {
      pageSize: 100,
      tokens: [],
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
        .then((res) => {
          state.total = res.totalCount;
          state.tokens = res.tokenInfoList;
        });
    }
  },
  mutations: {}
};
