import { insertList } from '@/utils/_';

export default {
  namespaced: true,
  state() {
    return {
      pageSize: 10,
      snapshots: []
    };
  },
  getters: {
    pageNumber(state, getters, rootState) {
      return Math.ceil(rootState.height / state.pageSize);
    }
  },
  mutations: {
    update(state, obj) {
      for (const key in obj) {
        state[key] = obj[key];
      }
    },
    // update snapshots
    updateSnapshots(state, snapshots) {
      state.snapshots = [];
      for (const i in snapshots) {
        state.snapshots = insertList(
          state.snapshots,
          Object.seal(snapshots[i]),
          'height',
          state.pageSize
        );
      }
    }
  }
};
