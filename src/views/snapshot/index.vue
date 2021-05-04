<template>
  <div class="uk-background-muted m-view">
    <div class="uk-padding uk-background-default">
      <div class="uk-flex">
        <div class="uk-card uk-flex-1">
          <p class="m-p uk-text-muted">Height</p>
          <p class="m-p uk-text-bolder uk-text-emphasis">{{ height }}</p>
        </div>
        <hr class="uk-divider-vertical m-divider" />
        <div class="uk-card uk-flex-1">
          <p class="m-p uk-text-muted">TODO</p>
          <p class="m-p uk-text-bolder uk-text-emphasis">TODO</p>
        </div>
        <hr class="uk-divider-vertical m-divider" />
        <div class="uk-card uk-flex-1">
          <p class="m-p uk-text-muted">TODO</p>
          <p class="m-p uk-text-bolder uk-text-emphasis">TODO</p>
        </div>
        <hr class="uk-divider-vertical m-divider" />
        <div class="uk-card uk-flex-1">
          <p class="m-p uk-text-muted">TODO</p>
          <p class="m-p uk-text-bolder uk-text-emphasis">TODO</p>
        </div>
      </div>
    </div>
    <div class="uk-padding">
      <p class="uk-text-lead">Snapshot Blocks</p>
      <table class="uk-table uk-table-divider m-table">
        <thead>
          <tr>
            <th>Height</th>
            <th>Hash</th>
            <th>Time</th>
            <th>PRODUCER</th>
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
            <td>{{ new Date(item.timestamp * 1000).toLocaleString() }}</td>
            <td class="m-address-tag m-text-truncate">{{ item.producer }}</td>
            <td>
              <!-- TODO confirm the sbp detail router -->
              <router-link :to="'/sbps/' + item.producer">{{
                getSbp(item.producer)
              }}</router-link>
            </td>
            <td>{{ Object.keys(item.snapshotData || {}).length }}</td>
          </tr>
        </tbody>
      </table>

      <pagination :page-num="pageNumber" @select="getBlocks" />
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, createNamespacedHelpers } from 'vuex';
import Hash from '@/components/Hash';
import Pagination from '@/components/Pagination';
import { log } from '@/utils/log';

const {
  mapState: _mapState,
  mapMutations: _mapMutations,
  mapGetters: _mapGetters
} = createNamespacedHelpers('snapshot');

const {
  mapState: sbpMapState,
  mapActions: sbpMapActions
} = createNamespacedHelpers('sbp');

export default {
  beforeRouteEnter(to, from, next) {
    const page = to.params.page ? to.params.page : 1;
    next(vm => {
      vm.getHeight().then(() => {
        return vm.getBlocks(page);
      });
      vm.getSbps();
    });
  },
  data() {
    return {
      loading: false
    };
  },
  computed: {
    ...mapState(['height']),
    ..._mapState(['snapshots', 'pageSize']),
    ..._mapGetters(['pageNumber']),
    ...sbpMapState(['sbps'])
  },
  methods: {
    ..._mapMutations(['updateSnapshots', 'update']),
    ...mapActions(['getHeight']),
    ...sbpMapActions(['getSbps']),
    getBlocks(page) {
      log('page', page);
      if (this.loading) {
        return;
      }
      this.loading = true;

      const offset = page * this.pageSize;
      let start = Math.max(this.height - offset, 1);
      const end = start + this.pageSize;
      const promises = [];

      promises.unshift(
        this.$api
          .request('ledger_getSnapshotBlocks', end, this.pageSize)
          .then(blocks => {
            this.updateSnapshots(blocks);
          })
      );
      return Promise.all(promises).finally(() => {
        this.loading = false;
      });
    },
    getSbp(producer) {
      const sbp = this.sbps.find(sbp => sbp.blockProducingAddress === producer);
      if (sbp) {
        return sbp.sbpName;
      }
      return '';
    }
  },
  components: {
    Hash,
    Pagination
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
  text-align: center;
}

.m-divider {
  height: auto;
  margin: 0 20px;
}

.m-table {
  border: 1px solid @border;
}
</style>
