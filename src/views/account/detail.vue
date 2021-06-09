<template>
  <div class="uk-padding">
    <div v-if="account" class="uk-margin-top">
      <div>
        <ul class="uk-subnav uk-subnav-pill" uk-margin>
          <li
            :class="{ 'uk-active': tab === 'balance' }"
            @click="tab = 'balance'"
          >
            Token Balance
          </li>
          <li :class="{ 'uk-active': tab === 'tx' }" @click="tab = 'tx'">
            TXs
          </li>
          <li :class="{ 'uk-active': tab === 'utx' }" @click="tab = 'utx'">
            Pending To Receive
          </li>
        </ul>

        <div v-if="tab === 'balance'">
          <table class="uk-table uk-table-divider">
            <thead>
              <tr>
                <th>Symbol</th>
                <th>Name</th>
                <th>Token Id</th>
                <th>Balance</th>
              </tr>
            </thead>
            <tbody class="uk-background-default">
              <tr v-for="item in tokens" :key="item.tokenInfo.tokenId">
                <td>{{ item.tokenInfo.tokenSymbolView }}</td>
                <td>{{ item.tokenInfo.tokenName }}</td>
                <td>
                  <v-link prefix="/tokens/" :value="item.tokenInfo.tokenId" />
                </td>
                <td>{{ item.balance }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div v-if="tab === 'tx'">
          <table class="uk-table uk-table-divider">
            <thead>
              <tr>
                <th>Height</th>
                <th>Hash</th>
                <th>Type</th>
                <th>Token</th>
                <th>From</th>
                <th>To</th>
                <th>Amount</th>
                <th>Confirmations</th>
              </tr>
            </thead>
            <tbody class="uk-background-default">
              <tr v-for="item in txs" :key="item.height">
                <td>{{ item.height }}</td>
                <td>
                  <v-link prefix="/txs/" :value="item.hash" />
                </td>
                <td>{{ blockTypeText(item.blockType) }}</td>
                <td>{{ item.tokenInfo.tokenSymbol }}</td>
                <td>
                  <v-link prefix="/accounts/" :value="item.fromAddress" />
                </td>
                <td>
                  <v-link prefix="/accounts/" :value="item.toAddress" />
                </td>
                <td>{{ item.amount }}</td>
                <td>{{ new Date(item.timestamp * 1000).toLocaleString() }}</td>
              </tr>
            </tbody>
          </table>
          <pagination :page-num="txPageNum" @select="getTxs" />
        </div>
        <div v-if="tab === 'utx'">
          <table class="uk-table uk-table-divider">
            <thead>
              <tr>
                <th>Hash</th>
                <th>Type</th>
                <th>Token</th>
                <th>From</th>
                <th>Height</th>
                <th>To</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody class="uk-background-default">
              <tr v-for="item in txs" :key="item.height">
                <td>
                  <v-link prefix="/txs/" :value="item.hash" />
                </td>
                <td>{{ blockTypeText(item.blockType) }}</td>
                <td>{{ item.tokenInfo.tokenSymbol }}</td>
                <td>
                  <v-link prefix="/accounts/" :value="item.fromAddress" />
                </td>
                <td>{{ item.height }}</td>
                <td>
                  <v-link prefix="/accounts/" :value="item.toAddress" />
                </td>
                <td>{{ item.amount }}</td>
              </tr>
            </tbody>
          </table>
          <pagination :page-num="utxPageNum" @select="getUtxs2" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import VLink from '@/components/Link';
import Pagination from '@/components/Pagination';
import { blockTypeText } from '@/utils/_';

const { mapState, mapActions, mapGetters, mapMutations } =
  createNamespacedHelpers('account');

export default {
  beforeRouteEnter(to, from, next) {
    const address = to.params.address;
    next(vm => {
      if (address) {
        vm.getAccountDetail(address);
      }
    });
  },
  beforeRouteUpdate(to, from, next) {
    const address = to.params.address;
    this.getAccountDetail(address).then(() => next());
  },
  data() {
    return {
      tab: 'balance'
    };
  },
  computed: {
    ...mapState(['account', 'txs', 'txPageSize']),
    ...mapGetters(['txPageNum', 'utxPageNum']),
    tokens() {
      if (this.account && this.account.balanceInfoMap) {
        return Object.values(this.account.balanceInfoMap).sort(
          (a, b) => parseFloat(a.balance) - parseFloat(b.balance)
        );
      }
      return [];
    }
  },
  watch: {
    tab(value) {
      switch (value) {
        case 'balance': {
          return;
        }
        case 'tx': {
          this.getTxs(1);
          return;
        }
        case 'utx': {
          this.getUtxs2(1);
          return;
        }
      }
    }
  },
  methods: {
    ...mapActions(['getAccountInfo', 'getUtxs', 'getUtxCount']),
    ...mapMutations(['addTx', 'updateTxs']),
    blockTypeText,
    getTxs(page) {
      this.$api
        .request(
          'ledger_getAccountBlocksByAddress',
          this.account.address,
          page - 1,
          this.txPageSize
        )
        .then(
          txs => {
            this.updateTxs(Object.seal(txs || []));
          },
          err => {
            console.error(`failed to get txs`, err);
            this.updateTxs([]);
          }
        );
    },
    getUtxs2(page) {
      return this.getUtxs(this.account.address, page - 1);
    },
    getAccountDetail(address) {
      address = address.trim();
      if (address) {
        this.getAccountInfo(address);
        this.getUtxCount(address);
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
.uk-subnav {
  li {
    cursor: pointer;
  }
  .uk-active {
    font-weight: bold;
  }
}
</style>
