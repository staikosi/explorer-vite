<template>
  <div class="uk-padding">
    <div v-if="account" class="uk-margin-top">
      <div>
        <table class="uk-table uk-table-divider">
          <tbody class="uk-background-default">
            <tr>
              <td>Address</td>
              <td>{{ account.address }} ({{ account.accountType }})</td>
            </tr>
            <tr>
              <td>Height</td>
              <td>{{ account.blockCount }}</td>
            </tr>
          </tbody>
        </table>
      </div>
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

          <li
            v-if="isContract(account.address)"
            :class="{ 'uk-active': tab === 'abi' }"
            @click="tab = 'abi'"
          >
            Contract
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
                  <v-link prefix="/token/" :value="item.tokenInfo.tokenId" />
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
                  <v-link prefix="/tx/" :value="item.hash" />
                </td>
                <td>{{ blockTypeText(item.blockType) }}</td>
                <td>{{ item.tokenInfo.tokenSymbol }}</td>
                <td>
                  <v-link prefix="/account/" :value="item.fromAddress" />
                </td>
                <td>
                  <v-link prefix="/account/" :value="item.toAddress" />
                </td>
                <td>{{ item.amount }}</td>
                <td>{{ new Date(item.timestamp * 1000).toLocaleString() }}</td>
              </tr>
            </tbody>
          </table>
          <pagination :page-num="txPageNum" @select="getCurrentTxs" />
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
                  <v-link prefix="/tx/" :value="item.hash" />
                </td>
                <td>{{ blockTypeText(item.blockType) }}</td>
                <td>{{ item.tokenInfo.tokenSymbol }}</td>
                <td>
                  <v-link prefix="/account/" :value="item.fromAddress" />
                </td>
                <td>{{ item.height }}</td>
                <td>
                  <v-link prefix="/account/" :value="item.toAddress" />
                </td>
                <td>{{ item.amount }}</td>
              </tr>
            </tbody>
          </table>
          <pagination :page-num="utxPageNum" @select="getCurrentUtxs" />
        </div>
        <div v-if="tab === 'abi'">
          <div>
            <textarea
              class="uk-textarea uk-form-small uk-width-2-3"
              placeholder="abi json"
              v-model="curAbiJson"
            ></textarea>

            <button
              class="uk-button uk-button-secondary"
              @click="saveAbiJson()"
            >
              Save ABI
            </button>
          </div>
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
import { isContract } from '@/utils/vite';

const { mapState, mapActions, mapGetters, mapMutations } =
  createNamespacedHelpers('account');

export default {
  beforeRouteEnter(to, from, next) {
    const address = to.params.address;
    next(vm => {
      if (address) {
        vm.curAddr = address;
        vm.getAccountDetail(vm.curAddr);
      }
    });
  },
  beforeRouteUpdate(to, from, next) {
    this.curAddr = to.params.address;
    this.getAccountDetail(this.curAddr);
    this.refreshByTab(this.tab);
    next();
  },
  data() {
    return {
      tab: 'balance',
      curAddr: '',
      curAbiJson: ''
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
      this.refreshByTab(value);
    }
  },
  methods: {
    ...mapActions(['getAccountInfo', 'getUtxs', 'getUtxCount', 'getAbi']),
    ...mapMutations(['addTx', 'updateTxs', 'setAbiJson']),
    blockTypeText,
    isContract,
    getCurrentTxs(page) {
      this.getTxs(this.curAddr, page);
    },
    refreshByTab(tabVal) {
      switch (tabVal) {
        case 'balance': {
          return;
        }
        case 'tx': {
          this.getCurrentTxs(1);
          return;
        }
        case 'utx': {
          this.getCurrentUtxs(1);
          return;
        }
        case 'abi': {
          this.getAbi(this.curAddr).then(value => {
            this.curAbiJson = JSON.stringify(value);
          });
          return;
        }
      }
    },
    getTxs(address, page) {
      this.$api
        .request(
          'ledger_getAccountBlocksByAddress',
          address,
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
    getCurrentUtxs(page) {
      return this.getUtxs(this.curAddr, page - 1);
    },
    getAccountDetail(address) {
      address = address.trim();
      if (address) {
        this.getAccountInfo(address);
        this.getUtxCount(address);
      }
    },
    saveAbiJson() {
      const json = this.curAbiJson;
      console.log(json);
      this.setAbiJson({ address: this.curAddr, abiJson: json });
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
