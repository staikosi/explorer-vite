<template>
  <div class="uk-background-muted">
    <div class="uk-padding">
      <p class="uk-text-lead">Account Block Detail</p>

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
            <td>BlockType</td>
            <td>{{ blockTypeText(block.blockType) }}</td>
          </tr>
          <tr v-if="isReceive(block.blockType)">
            <td>SendBlockHash</td>
            <td>
              <v-link
                prefix="/txs/"
                :value="block.sendBlockHash"
                :full="true"
              />
            </td>
          </tr>
          <tr v-if="!isReceive(block.blockType)">
            <td>ReceiveBlockHash</td>
            <td>
              <v-link
                prefix="/txs/"
                :value="block.receiveBlockHash"
                :full="true"
              />
            </td>
          </tr>
          <tr>
            <td>Time</td>
            <td>{{ new Date(block.timestamp * 1000).toLocaleString() }}</td>
          </tr>
          <tr>
            <td>Confirmations</td>
            <td>{{ block.confirmations }}</td>
          </tr>
          <tr>
            <td>FirstSnapshotHash</td>
            <td>
              <v-link
                prefix="/snapshots/"
                :value="block.firstSnapshotHash"
                :full="true"
              />
            </td>
          </tr>
          <tr>
            <td>FromAddress</td>
            <td>
              <v-link
                prefix="/accounts/"
                :value="block.fromAddress"
                :full="true"
              />
            </td>
          </tr>
          <tr>
            <td>ToAddress</td>
            <td>
              <v-link
                prefix="/accounts/"
                :value="block.toAddress"
                :full="true"
              />
            </td>
          </tr>

          <tr>
            <td>Token</td>
            <td>{{ block.tokenInfo.tokenSymbol }}</td>
          </tr>
          <tr>
            <td>Amount</td>
            <td>{{ atos(block.amount, block.tokenInfo.decimals) }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { atos, blockTypeText, isReceive } from '@/utils/_';
import VLink from '@/components/Link';

export default {
  beforeRouteEnter(to, from, next) {
    const hash = to.params.hash;
    next(vm => vm.getBlock(hash));
  },
  beforeRouteUpdate(to, from, next) {
    const hashto = to.params.hash;
    this.getBlock(hashto).then(() => next());
  },
  data() {
    return {
      block: null
    };
  },
  methods: {
    atos,
    blockTypeText,
    isReceive,
    getBlock(hash) {
      this.$api.request('ledger_getAccountBlockByHash', hash).then(block => {
        this.block = Object.seal(block);
      });
    }
  },
  components: {
    VLink
  }
};
</script>
