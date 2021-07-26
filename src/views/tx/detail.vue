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
              <v-link prefix="/tx/" :value="block.sendBlockHash" :full="true" />
            </td>
          </tr>
          <tr v-if="!isReceive(block.blockType)">
            <td>ReceiveBlockHash</td>
            <td>
              <v-link
                prefix="/tx/"
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
                prefix="/snapshot/"
                :value="block.firstSnapshotHash"
                :full="true"
              />
            </td>
          </tr>
          <tr>
            <td>FromAddress</td>
            <td>
              <v-link
                prefix="/account/"
                :value="block.fromAddress"
                :full="true"
              />
            </td>
          </tr>
          <tr>
            <td>ToAddress</td>
            <td>
              <v-link
                prefix="/account/"
                :value="block.toAddress"
                :full="true"
              />
            </td>
          </tr>

          <tr>
            <td>Token</td>
            <td>
              {{ block.tokenInfo.tokenSymbolView }}
            </td>
          </tr>
          <tr>
            <td>Amount</td>
            <td>{{ block.amount }}</td>
          </tr>
          <tr v-if="block.vmLogHash">
            <td>Event Log</td>
            <td>
              <!-- <v-link prefix="/log/" :value="block.vmLogHash" :full="true" /> -->

              {{ block.vmLogHash }}
            </td>
          </tr>
          <tr v-if="block.data">
            <td>Data</td>
            <td>
              <!-- <v-link prefix="/log/" :value="block.vmLogHash" :full="true" /> -->
              <!-- <textarea v-model="block.data"> </textarea> -->

              <v-blockdata
                :value="block.data"
                :blockType="block.blockType"
                :to="block.toAddress"
              ></v-blockdata>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { atos, blockTypeText, isReceive, tokenView } from '@/utils/_';
import { nullToken } from '@/utils/consts';
import VLink from '@/components/Link';
import VBlockdata from '@/components/Blockdata';

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
      return this.$api
        .request('ledger_getAccountBlockByHash', hash)
        .then(block => {
          if (!block.tokenInfo) {
            block.tokenInfo = nullToken;
          } else {
            block.tokenInfo.tokenSymbolView = tokenView(
              block.tokenInfo.tokenSymbol,
              block.tokenInfo.index
            );
          }
          if (block.data) {
            block.hexData = Buffer.from(block.data, 'base64').toString('hex');
          }
          block.amount = atos(block.amount, block.tokenInfo.decimals);

          this.block = Object.seal(block);
        });
    }
  },
  components: {
    VLink,
    VBlockdata
  }
};
</script>
