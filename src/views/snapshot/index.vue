<template>
  <div class="uk-background-muted m-view">
    <div class="uk-padding uk-background-default">
      <div class="uk-flex">
        <div class="uk-card uk-flex-1">
          <p class="m-p uk-text-muted">Block Height</p>
          <p class="m-p uk-text-bolder uk-text-emphasis">{{ height }}</p>
        </div>
        <hr class="uk-divider-vertical m-divider" />
        <div class="uk-card uk-flex-1">
          <p class="m-p uk-text-muted">Latest Version</p>
          <p class="m-p uk-text-bolder uk-text-emphasis">
            <a
              :href="
                'https://github.com/vitelabs/go-vite/releases/tag/' +
                goViteVersion
              "
              target="_blank"
              >{{ goViteVersion }}</a
            >
          </p>
        </div>
        <hr class="uk-divider-vertical m-divider" />
        <div class="uk-card uk-flex-1">
          <p class="m-p uk-text-muted">Total Supply</p>
          <p class="m-p uk-text-bolder uk-text-emphasis">{{ circulating }}</p>
        </div>
        <hr class="uk-divider-vertical m-divider" />
        <div class="uk-card uk-flex-1">
          <p class="m-p uk-text-muted">VITE / BTC</p>
          <p class="m-p uk-text-bolder uk-text-emphasis">{{ priceToBTC }}</p>
        </div>
      </div>
    </div>
    <div class="uk-padding">
      <p class="uk-text-lead">Snapshot Blocks</p>

      <search placeholder="Snapshot Block Height or Hash" @search="search" />

      <table class="uk-table uk-table-divider">
        <thead>
          <tr>
            <th>Height</th>
            <th>Hash</th>
            <th>Time</th>
            <th>Mined By</th>
            <th>SBP</th>
            <th>Tx</th>
          </tr>
        </thead>
        <tbody class="uk-background-default">
          <tr v-for="item in snapshots" :key="item.height">
            <td>{{ item.height }}</td>
            <td>
              <v-link prefix="/snapshots/" :value="item.hash" />
            </td>
            <td>{{ new Date(item.timestamp * 1000).toLocaleString() }}</td>
            <td>
              <v-link prefix="/accounts/" :value="item.producer" />
            </td>
            <td>
              <v-link
                prefix="/sbps/"
                :value="getSbpName(sbps, item.producer)"
              />
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
import VLink from '@/components/Link';
import Pagination from '@/components/Pagination';
import Search from '@/components/Search';
import { log } from '@/utils/log';
import { getSbpName } from '@/utils/_';
import { VITE } from '@/utils/consts';

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
    next((vm) => {
      vm.getGoViteVersion();
      vm.getHeight().then(() => {
        return vm.getBlocks(page);
      });
      vm.getSbps();
      vm.getTokenDetails(VITE);
      vm.getPriceToBTC();
    });
  },
  data() {
    return {
      loading: false
    };
  },
  computed: {
    ...mapState(['height', 'goViteVersion', 'priceToBTC', 'circulating']),
    ...snapshotMapState(['snapshots', 'pageSize']),
    ...snapshotMapGetters(['pageNumber']),
    ...sbpMapState(['sbps'])
  },
  methods: {
    ...snapshotMapMutations(['updateSnapshots', 'update']),
    ...mapActions(['getHeight', 'getGoViteVersion', 'getPriceToBTC']),
    ...sbpMapActions(['getSbps']),
    ...tokenMapActions(['getTokenDetails']),
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
          .then((blocks) => {
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
        this.$router.push(`/snapshots/${value}`);
      }
    }
  },
  components: {
    VLink,
    Pagination,
    Search
  }
};
</script>

<style lang="less">
.m-p {
  margin: 0;
}

.m-divider {
  height: auto;
  margin: 0 30px;
}
</style>
