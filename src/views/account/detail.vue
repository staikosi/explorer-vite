<template>
  <div class="uk-padding">
    <p class="uk-text-lead">Account</p>
    <search placeholder="Input vite address" @search="getAccountDetail" />

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
            Transactions
          </li>
          <li :class="{ 'uk-active': tab === 'utx' }" @click="tab = 'utx'">
            Unreceived Txs
          </li>
        </ul>

        <div v-if="tab === 'balance'">
          <table class="uk-table uk-table-divider m-table">
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
                  <token
                    :link="'/tokens/' + item.tokenInfo.tokenId"
                    :token="item.tokenInfo.tokenId"
                  />
                </td>
                <td>{{ item.balance }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div v-if="tab === 'tx'">
          <table class="uk-table uk-table-divider m-table">
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
                  <hash :link="'/tx/' + item.hash" :hash="item.hash" />
                </td>
                <td>{{ item.blockType }}</td>
                <td>{{ item.tokenInfo.tokenSymbol }}</td>
                <td>
                  <addr
                    :link="'/account/' + item.fromAddress"
                    :address="item.fromAddress"
                  />
                </td>
                <td>
                  <addr
                    :link="'/account/' + item.toAddress"
                    :address="item.toAddress"
                  />
                </td>
                <td>{{ item.amount }}</td>
                <td>{{ new Date(item.timestamp * 1000).toLocaleString() }}</td>
              </tr>
            </tbody>
          </table>
          <pagination :page-num="txPageNum" @select="getTxs" />
        </div>
        <div v-if="tab === 'utx'">
          <table class="uk-table uk-table-divider m-table">
            <thead>
              <tr>
                <th>Height</th>
                <th>Hash</th>
                <th>Type</th>
                <th>Token</th>
                <th>From</th>
                <th>To</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody class="uk-background-default">
              <tr v-for="item in txs" :key="item.height">
                <td>{{ item.height }}</td>
                <td>
                  <hash :link="'/tx/' + item.hash" :hash="item.hash" />
                </td>
                <td>{{ item.blockType }}</td>
                <td>{{ item.tokenInfo.tokenSymbol }}</td>
                <td>
                  <hash
                    :link="'/account/' + item.fromAddress"
                    :hash="item.fromAddress"
                  />
                </td>
                <td>
                  <hash
                    :link="'/account/' + item.toAddress"
                    :hash="item.toAddress"
                  />
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
import Hash from '@/components/Hash';
import Addr from '@/components/Addr';
import Token from '@/components/Token';
import Pagination from '@/components/Pagination';
import Search from '@/components/Search';

const {
  mapState,
  mapActions,
  mapGetters,
  mapMutations
} = createNamespacedHelpers('account');

export default {
  beforeRouteEnter(to, from, next) {
    const address = to.params.address;
    next(vm => {
      if (address) {
        vm.getAccountDetail(address);
      }
    });
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
      if (!this.account) return [];
      return Object.values(this.account.balanceInfoMap).sort(
        (a, b) => parseFloat(a.balance) - parseFloat(b.balance)
      );
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
    getTxs(page) {
      this.$api
        .request(
          'ledger_getAccountBlocksByAddress',
          this.account.address,
          page,
          this.txPageSize
        )
        .then(txs => {
          this.updateTxs(Object.seal(txs));
        });
    },
    getUtxs2(page) {
      return this.getUtxs(page - 1);
    },
    getAccountDetail(address) {
      this.getAccountInfo(address);
      this.getUtxCount(address);
    }
  },
  components: {
    Hash,
    Addr,
    Token,
    Pagination,
    Search
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
