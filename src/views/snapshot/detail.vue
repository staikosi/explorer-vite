<template>
  <div class="uk-background-muted m-view">
    <div class="uk-padding">
      <p class="uk-text-lead">Snapshot Block Detail</p>

      <table class="uk-table uk-table-divider" v-if="block">
        <tbody class="uk-background-default">
          <tr>
            <td>Height</td>
            <td>{{ block.height }}</td>
          </tr>
          <tr>
            <td>Hash</td>
            <td>{{ block.hash }}</td>
          </tr>
          <tr>
            <td>Producer</td>
            <td>{{ block.producer }}</td>
          </tr>
          <tr>
            <td>SBP</td>
            <td>
              <v-link
                prefix="/sbps/"
                :value="getSbpName(sbps, block.producer)"
              />
            </td>
          </tr>
          <tr>
            <td>Time</td>
            <td>{{ new Date(block.timestamp * 1000).toLocaleString() }}</td>
          </tr>
        </tbody>
      </table>

      <p class="uk-text-lead" v-if="block && block.snapshotData">TX</p>

      <table
        class="uk-table uk-table-divider"
        v-if="block && block.snapshotData"
      >
        <thead>
          <tr>
            <th>Address</th>
            <th>Height</th>
            <th>Hash</th>
          </tr>
        </thead>
        <tbody class="uk-background-default">
          <tr v-for="(item, addr) in block.snapshotData || {}" :key="addr">
            <td>
              <v-link prefix="/accounts/" :value="addr" />
            </td>
            <td>{{ item.height }}</td>
            <td>
              <v-link prefix="/txs/" :value="item.hash" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { getSbpName } from '@/utils/_';
import { createNamespacedHelpers } from 'vuex';

const {
  mapState: sbpMapState,
  mapActions: sbpMapActions
} = createNamespacedHelpers('sbp');

export default {
  beforeRouteEnter(to, from, next) {
    const heightorhash = to.params.heightorhash;
    next(vm => {
      vm.getSbps();
      vm.getBlock(heightorhash);
    });
  },
  beforeRouteUpdate(to, from, next) {
    const heightorhash = to.params.heightorhash;
    this.getBlock(heightorhash).then(() => next());
  },
  data() {
    return {
      block: null
    };
  },
  computed: {
    ...sbpMapState(['sbps'])
  },
  methods: {
    ...sbpMapActions(['getSbps']),
    getSbpName,
    getBlock(heightorhash) {
      const vm = this;
      const height = parseInt(heightorhash, 10);
      const promise =
        heightorhash.length !== 64
          ? vm.$api.request('ledger_getSnapshotBlockByHeight', height)
          : vm.$api.request('ledger_getSnapshotBlockByHash', heightorhash);
      return promise.then(block => {
        vm.block = Object.seal(block);
      });
    }
  }
};
</script>
