<template>
  <div class="uk-background-muted">
    <div class="uk-padding">
      <p class="uk-text-lead">Snapshot Blocks</p>
      <table class="uk-table uk-table-divider">
        <thead>
          <tr>
            <th>Height</th>
            <th>Hash</th>
            <th>Time</th>
            <th>Mined By</th>
            <th>SBP</th>
            <th>Tx</th>
            <th>Version</th>
          </tr>
        </thead>
        <tbody class="uk-background-default">
          <tr v-for="item in snapshots" :key="item.height">
            <td>{{ item.height }}</td>
            <td>
              <v-link prefix="/snapshot/" :value="item.hash" />
            </td>
            <td>{{ new Date(item.timestamp * 1000).toLocaleString() }}</td>
            <td>
              <v-link prefix="/account/" :value="item.producer" />
            </td>
            <td>
              <v-link prefix="/sbp/" :value="getSbpName(sbps, item.producer)" />
            </td>
            <td>{{ Object.keys(item.snapshotData || {}).length }}</td>
            <td>{{ item.version }}</td>
          </tr>
        </tbody>
      </table>

      <pagination :page-num="pageNumber" @select="getBlocks" />
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, createNamespacedHelpers } from 'vuex';
import VLink from '@/components/Link';
import Pagination from '@/components/Pagination';
import { log } from '@/utils/log';
import { getSbpName } from '@/utils/_';

const {
  mapState: snapshotMapState,
  mapMutations: snapshotMapMutations,
  mapGetters: snapshotMapGetters
} = createNamespacedHelpers('snapshot');

const {
  mapState: sbpMapState,
  mapActions: sbpMapActions
} = createNamespacedHelpers('sbp');

const { mapActions: tokenMapActions } = createNamespacedHelpers('token');

export default {
  beforeRouteEnter(to, from, next) {
    const page = to.params.page ? to.params.page : 1;
    next(vm => {
      vm.getHeight().then(() => vm.getBlocks(page));
      vm.getSbps();
    });
  },
  data() {
    return {
      loading: false,
      searching: false
    };
  },
  computed: {
    ...mapState(['height']),
    ...snapshotMapState(['snapshots', 'pageSize']),
    ...snapshotMapGetters(['pageNumber']),
    ...sbpMapState(['sbps'])
  },
  methods: {
    ...snapshotMapMutations(['updateSnapshots', 'update']),
    ...mapActions(['getHeight']),
    ...sbpMapActions(['getSbps']),
    ...tokenMapActions(['getTokenDetails']),
    getBlocks(page) {
      log('page', page);
      if (this.loading) {
        return;
      }
      this.loading = true;

      const offset = page * this.pageSize;
      const start = Math.max(this.height - offset, 1);
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
    getSbpName,
    search(value) {
      value = value.trim();
      if (value) {
        this.$router.push(`/snapshot/${value}`);
      }
    },
    uniSearch(value) {
      value = value.trim();
      if (!value || this.searching) {
        return;
      }

      this.searching = true;
      if (value.startsWith('tti_')) {
        this.$router.push(`/token/${value}`);
      } else if (value.startsWith('vite_')) {
        this.$router.push(`/account/${value}`);
      } else if (value.length === 64) {
        this.$api
          .request('ledger_getSnapshotBlockByHash', value)
          .then(block => {
            if (block) {
              this.$router.push(`/snapshot/${value}`);
            } else {
              this.$router.push(`/tx/${value}`);
            }
            this.searching = false;
          });
      } else {
        this.$router.push(`/snapshot/${value}`);
      }
    }
  },
  components: {
    VLink,
    Pagination
  }
};
</script>

<style lang="less">
@import '~@/styles/vars.less';

.m-p {
  margin: 0;
}

.m-divider {
  height: 50px;
  margin: 0 30px;
}

.uk-sticky-below.dashboard {
  border-bottom: 1px solid @border;
}

.dashboard {
  padding-top: 30px;
  padding-bottom: 30px;

  &.uk-sticky-below {
    border-bottom: 1px solid @border;
  }
}
</style>
