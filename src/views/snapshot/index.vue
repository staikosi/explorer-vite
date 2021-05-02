<template>
  <div class="uk-background-muted m-view">
    <div class="uk-padding-small uk-background-default">
      <div class="uk-flex">
        <div class="uk-card uk-padding-small">
          <p class="m-p uk-text-muted">Height</p>
          <p class="m-p uk-text-bolder uk-text-emphasis">{{ height }}</p>
        </div>
        <hr class="uk-divider-vertical m-divider" />
        <div class="uk-card uk-padding-small">
          <p class="m-p uk-text-muted">Height</p>
          <p class="m-p uk-text-bolder uk-text-emphasis">TODO</p>
        </div>
        <hr class="uk-divider-vertical m-divider" />
        <div class="uk-card uk-padding-small">
          <p class="m-p uk-text-muted">Height</p>
          <p class="m-p uk-text-bolder uk-text-emphasis">TODO</p>
        </div>
        <hr class="uk-divider-vertical m-divider" />
        <div class="uk-card uk-padding-small">
          <p class="m-p uk-text-muted">Height</p>
          <p class="m-p uk-text-bolder uk-text-emphasis">1828398494</p>
        </div>
      </div>
    </div>
    <div class="uk-padding-small">
      <p class="uk-text-lead">Snapshot Blocks</p>
      <table class="uk-table uk-table-divider m-table">
        <thead>
          <tr>
            <th>Height</th>
            <th>Hash</th>
            <th>Time</th>
            <th>SBP</th>
            <th>Tx</th>
          </tr>
        </thead>
        <tbody class="uk-background-default">
          <tr v-for="item in snapshots" :key="item.height">
            <td>{{ item.height }}</td>
            <td>
              <hash :link="'/snapshots/' + item.hash" :hash="item.hash" />
            </td>
            <td>{{ new Date(item.timestamp).toLocaleString() }}</td>
            <td>{{ item.producer }}</td>
            <td>{{ Object.keys(item.snapshotData).length }}</td>
          </tr>
        </tbody>
      </table>

      <ul class="uk-pagination uk-flex-right" uk-margin>
        <li>
          <a href="#"><span uk-pagination-previous></span></a>
        </li>
        <li><a href="#">1</a></li>
        <li class="uk-disabled"><span>...</span></li>
        <li><a href="#">4</a></li>
        <li><a href="#">5</a></li>
        <li><a href="#">6</a></li>
        <li class="uk-active"><span>7</span></li>
        <li><a href="#">8</a></li>
        <li><a href="#">9</a></li>
        <li><a href="#">10</a></li>
        <li class="uk-disabled"><span>...</span></li>
        <li><a href="#">20</a></li>
        <li>
          <a href="#"><span uk-pagination-next></span></a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState, createNamespacedHelpers } from 'vuex';
import { UPDATE } from '@/store/mutations';
import Hash from '@/components/Hash';

const {
  mapState: _mapState,
  mapMutations: _mapMutations
} = createNamespacedHelpers('snapshot');

export default {
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.$api.request('ledger_getSnapshotChainHeight').then((height) => {
        vm.$store.commit(UPDATE, { height });
        vm.$api
          .request('ledger_getSnapshotBlockByHeight', height)
          .then((block) => {
            vm.addSnapshot(block);
          });
      });
    });
  },
  computed: {
    ...mapState(['height']),
    ..._mapState({
      snapshots: (state) => state.snapshots,
      pageSize: (state) => state.pageSize
    })
  },
  methods: {
    ..._mapMutations(['addSnapshot'])
  },
  components: {
    Hash
  }
};
</script>

<style lang="less">
@import '~@/styles/vars.less';

.m-view {
  height: 100%;
}
.m-p {
  margin: 0;
}
.m-divider {
  height: auto;
  margin-top: 0;
  margin-bottom: 0;
}

.m-table {
  border: 1px solid @border;
}
</style>
