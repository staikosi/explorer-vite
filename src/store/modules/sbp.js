import Vue from 'vue';
import { atos } from '@/utils/_';

export default {
  namespaced: true,
  state() {
    return {
      pageSize: 4,
      sbps: [],
      dayIndex: -1,
      sbpName: '',
      sbpstats: {},
      hourSbpstats: {},
      sbpstat: {},
      sbp: {},
      hourSbpstat: {},
      sbpRewards: []
    };
  },
  getters: {
    pageNum(state) {
      return Math.ceil(state.dayIndex / state.pageSize);
    }
  },
  actions: {
    getSbpList({ state }) {
      return Vue.$api.request('contract_getSBPList').then(res => {
        state.sbps = res;
        console.log(res);
      });
    },
    getSbps({ state }) {
      return Vue.$api.request('contract_getSBPVoteList').then(res => {
        state.sbps = res.map(sbp => {
          sbp.votes = atos(sbp.votes, 18);
          return sbp;
        });
      });
    },
    getSbpStats({ state }) {
      return Vue.$api
        .request('sbpstats_getDaySBPStats', state.dayIndex, state.dayIndex)
        .then(res => {
          state.sbpstats = {};
          const m = res[res.length - 1].stat.stats;
          for (var key in m) {
            m[key].voteCnt = atos(m[key].voteCnt, 18);
            state.sbpstats[key] = Object.seal(m[key]);
          }
        });
    },
    getHourSbpStats({ state }) {
      return Vue.$api.request('sbpstats_getHourSBPStats', 1, 0).then(res => {
        state.hourSbpstats = {};
        const m = res[res.length - 1].stat.stats;
        for (var key in m) {
          m[key].voteCnt = atos(m[key].voteCnt, 18);
          state.hourSbpstats[key] = Object.seal(m[key]);
        }
      });
    },

    getDayIndex({ state }) {
      return Vue.$api.request('sbpstats_time2Index', null, 2).then(res => {
        state.dayIndex = res;
      });
    },

    getSbp({ state }, sbpName) {
      return Vue.$api.request('contract_getSBP', sbpName).then(res => {
        state.sbpstat = res;
      });
    },
    setSbpName({ state }, sbpName) {
      console.log('set sbpName ', sbpName);
      state.sbpName = sbpName;
      state.sbpstat = Object.assign({}, state.sbpstat, state.sbpstats[sbpName]);
      state.hourSbpstat = state.hourSbpstats[sbpName];
    },
  },
  mutations: {
    updateRewards(state, rewards) {
      state.sbpRewards = rewards
        .map(r => {
          let result = Object.assign({}, r.rewardMap[state.sbpName], {});
          result.cycle = r.cycle;
          result.blockProducingReward = atos(result.blockProducingReward, 18);
          result.votingReward = atos(result.votingReward, 18);
          result.totalReward = atos(result.totalReward, 18);
          result.startTime = r.startTime;
          result.endTime = r.endTime;
          return result;
        })
        .sort((a, b) => {
          return b.cycle - a.cycle;
        });
    }
  }
};
