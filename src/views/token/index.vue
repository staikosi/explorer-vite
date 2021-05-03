<template>
  <div class="uk-background-muted m-view">
    <div class="uk-padding">
      <p class="uk-text-lead">Tokens ({{ total }})</p>
      <table class="uk-table uk-table-divider m-table">
        <thead>
          <tr>
            <th>Symbol</th>
            <th>Name</th>
            <th>Token Id</th>
            <th>Decimals</th>
            <th>Total Supply</th>
            <th>Max Supply</th>
            <th>ReIssuable</th>
            <th>Owner</th>
          </tr>
        </thead>
        <tbody class="uk-background-default">
          <tr v-for="item in tokens" :key="item.height">
            <td>{{ item.tokenSymbol }}</td>
            <td>{{ item.tokenName }}</td>
            <td>
              <hash :link="'/tokens/' + item.tokenId" :hash="item.tokenId" />
            </td>
            <td>{{ item.decimals }}</td>
            <td>{{ item.totalSupply }}</td>
            <td>{{ item.maxSupply }}</td>
            <td>{{ item.isReIssuable ? 'YES' : 'NO' }}</td>
            <td>
              <hash :link="'/accounts/' + item.owner" :hash="item.owner" />
            </td>
          </tr>
        </tbody>
      </table>

      <pagination :page-num="pageNum" @select="getTokens" />
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import Hash from '@/components/Hash';
import Pagination from '@/components/Pagination';
import { aToS } from '@/utils/_';

const { mapState, mapActions, mapGetters } = createNamespacedHelpers('token');

export default {
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.getTokenInfoList();
    });
  },
  data() {
    return {
      loading: false
    };
  },
  computed: {
    ...mapState({
      tokens: (state) =>
        state.tokens.map((token) => ({
          ...token,
          totalSupply: aToS(token.totalSupply, token.decimals),
          maxSupply: aToS(token.maxSupply, token.decimals)
        })),
      total: (state) => state.total
    }),
    ...mapGetters(['pageNum'])
  },
  methods: {
    ...mapActions(['getTokenInfoList']),
    getTokens(page) {
      if (this.loading) {
        return;
      }
      this.loading = true;
      this.getTokenInfoList(page - 1).finally(() => {
        this.loading = false;
      });
    }
  },
  components: {
    Hash,
    Pagination
  }
};
</script>

<style lang="less">
@import '~@/styles/vars.less';

.m-view {
  height: 100%;
}
.m-p {
  margin: 0;
}
.m-divider {
  height: auto;
  margin-top: 0;
  margin-bottom: 0;
}

.m-table {
  border: 1px solid @border;
}
</style>
