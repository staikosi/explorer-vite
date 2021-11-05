<template>
  <div class="uk-background-muted">
    <div class="uk-padding">
      <p class="uk-text-lead">Overview of Snapshot Block</p>

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
            <td>Previous Hash</td>
            <td>
              <v-link
                prefix="/snapshot/"
                :full="true"
                :value="block.previousHash"
              />
            </td>
          </tr>
          <tr>
            <td>Mined By</td>
            <td>{{ block.producer }}</td>
          </tr>
          <tr>
            <td>SBP</td>
            <td>
              <v-link
                prefix="/sbp/"
                :value="getSbpName(sbps, block.producer)"
              />
            </td>
          </tr>
          <tr>
            <td>Time</td>
            <td>{{ new Date(block.timestamp * 1000).toLocaleString() }}</td>
          </tr>
          <tr>
            <td>Version</td>
            <td>{{ block.version }}</td>
          </tr>
        </tbody>
      </table>

      <p class="uk-text-lead" v-if="block && block.snapshotData">
        Account Blocks
      </p>

      <table
        class="uk-table uk-table-divider"
        v-if="block && block.snapshotData"
      >
        <thead>
          <tr>
            <th>Hash</th>
            <th>Account Address</th>
            <th>Height</th>
            <th>Type</th>
          </tr>
        </thead>
        <tbody class="uk-background-default">
          <tr v-for="item in accountblocks" :key="item.hash">
            <td>
              <v-link prefix="/tx/" :value="item.hash" />
            </td>
            <td>
              <v-link
                prefix="/account/"
                :value="item.accountAddress"
                :full="true"
              />
            </td>
            <td>{{ item.height }}</td>
            <td>{{ blockTypeText(item.blockType) }}</td>
          </tr>
        </tbody>
      </table>

      <p class="uk-text-lead" v-if="block && !block.snapshotData">
        No Account Blocks
      </p>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import { getSbpName, blockTypeText } from '@/utils/_';
import VLink from '@/components/Link';

const {
  mapState: sbpMapState,
  mapActions: sbpMapActions
} = createNamespacedHelpers('sbp');

export default {
  beforeRouteEnter(to, from, next) {
    const { heightorhash } = to.params;
    next(vm => {
      vm.getSbps();
      vm.getBlock(heightorhash);
    });
  },
  beforeRouteUpdate(to, from, next) {
    const { heightorhash } = to.params;
    this.getBlock(heightorhash).then(() => next());
  },
  data() {
    return {
      block: null,
      accountblocks: null
    };
  },
  computed: {
    ...sbpMapState(['sbps'])
  },
  methods: {
    ...sbpMapActions(['getSbps']),
    getSbpName,
    blockTypeText,
    getBlock(heightorhash) {
      const vm = this;
      const height = parseInt(heightorhash, 10);
      if (height == 1) {
        return new Promise(() => 1);
      }
      const promise =
        heightorhash.length !== 64
          ? vm.$api.request('ledger_getSnapshotBlockByHeight', height)
          : vm.$api.request('ledger_getSnapshotBlockByHash', heightorhash);
      return promise
        .then(block => {
          vm.block = Object.seal(block);
          return block.height;
        })
        .then(blockheight => {
          vm.$api
            .request('ledger_getChunks', `${blockheight}`, `${blockheight}`)
            .then(chunks => {
              vm.accountblocks = Object.seal(chunks[0].AccountBlocks);
            });
        });
    }
  },
  components: {
    VLink
  }
};
</script>
