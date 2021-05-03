<template>
  <div v-if="account" class="uk-padding">
    <p>{{ account.address }}</p>
    <p>{{ account.blockCount }}</p>

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
              <td>{{ item.tokenInfo.tokenSymbol }}</td>
              <td>{{ item.tokenInfo.tokenName }}</td>
              <td>
                <hash
                  :link="'/tokens/' + item.tokenInfo.tokenId"
                  :hash="item.tokenInfo.tokenId"
                  :short="false"
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
              <td>{{ item.confirmations }}</td>
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
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import Hash from '@/components/Hash';
import Pagination from '@/components/Pagination';
import { atos } from '@/utils/_';

const {
  mapState,
  mapActions,
  mapGetters,
  mapMutations
} = createNamespacedHelpers('account');

export default {
  beforeRouteEnter(to, from, next) {
    const address = to.params.address;
    next((vm) => {
      vm.getAccountInfo(address);
      vm.getUtxCount(address);
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
    ...mapMutations(['addTx']),
    getTxs(page) {
      let start = Math.max(this.account.blockCount - page * this.txPageSize, 1);
      const end = start + this.txPageSize;
      while (start < end) {
        this.$api
          .request(
            'ledger_getAccountBlockByHeight',
            this.account.address,
            start
          )
          .then((tx) => {
            tx.amount = atos(tx.amount, tx.tokenInfo.decimals);
            this.addTx(Object.seal(tx));
          });
        start++;
      }
    },
    getUtxs2(page) {
      return this.getUtxs(page - 1);
    }
  },
  components: {
    Hash,
    Pagination
  }
};
</script>
