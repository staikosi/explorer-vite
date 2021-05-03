import Vue from 'vue';
import { atos } from '@/utils/_';

export default {
  namespaced: true,
  state() {
    return {
      pageSize: 100,
      sbps: []
    };
  },
  getters: {
    pageNum(state) {
      return Math.ceil(state.total / state.pageSize);
    }
  },
  actions: {
    getSbpList({ state }) {
      return Vue.$api.request('contract_getSBPList').then((res) => {
        state.sbps = res;
        console.log(res);
      });
    },
    getSbps({ state }) {
      return Vue.$api.request('contract_getSBPVoteList').then((res) => {
        state.sbps = res.map((sbp) => {
          sbp.votes = atos(sbp.votes, 18);
          return sbp;
        });
      });
    }
  },
  mutations: {}
};
