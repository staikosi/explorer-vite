import { insertList } from '@/utils/_';

export default {
  namespaced: true,
  state() {
    return {
      pageSize: 60,
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
      for (let key in obj) {
        state[key] = obj[key];
      }
    },
    // add to head
    addSnapshot(state, snapshot) {
      state.snapshots = insertList(
        state.snapshots,
        snapshot,
        'height',
        state.pageSize
      );
    }
  }
};
