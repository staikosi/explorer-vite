<template>
  <div class="uk-background-muted m-view">
    <div class="uk-padding-small">
      <p class="uk-text-lead">Tokens</p>
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

      <ul class="uk-pagination uk-flex-right" uk-margin>
        <li>
          <a href="#"><span uk-pagination-previous></span></a>
        </li>
        <li><a href="#">1</a></li>
        <li class="uk-disabled"><span>...</span></li>
        <li><a href="#">4</a></li>
        <li><a href="#">5</a></li>
        <li><a href="#">6</a></li>
        <li class="uk-active"><span>7</span></li>
        <li><a href="#">8</a></li>
        <li><a href="#">9</a></li>
        <li><a href="#">10</a></li>
        <li class="uk-disabled"><span>...</span></li>
        <li><a href="#">20</a></li>
        <li>
          <a href="#"><span uk-pagination-next></span></a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import Hash from '@/components/Hash';
import { aToS } from '@/utils/_';

const { mapState, mapActions } = createNamespacedHelpers('token');

export default {
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.getTokenInfoList();
    });
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
    })
  },
  methods: {
    ...mapActions(['getTokenInfoList'])
  },
  components: {
    Hash
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
