<template>
  <div class="uk-background-muted">
    <div class="uk-padding">
      <p class="uk-text-lead">Tokens ({{ total }})</p>
      <table class="uk-table uk-table-divider">
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
          <tr v-for="item in tokens" :key="item.tokenId">
            <td>{{ item.tokenSymbolView }}</td>
            <td>{{ item.tokenName }}</td>
            <td>
              <v-link prefix="/token/" :value="item.tokenId" />
            </td>
            <td>{{ item.decimals }}</td>
            <td>{{ item.totalSupply }}</td>
            <td class="m-hash-tag m-text-truncate">{{ item.maxSupply }}</td>
            <td>{{ item.isReIssuable ? 'YES' : 'NO' }}</td>
            <td>
              <v-link prefix="/account/" :value="item.owner" />
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
import VLink from '@/components/Link';
import Pagination from '@/components/Pagination';
import { atos } from '@/utils/_';

const { mapState, mapActions, mapGetters } = createNamespacedHelpers('token');

export default {
  beforeRouteEnter(to, from, next) {
    next(vm => {
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
      tokens: state =>
        state.tokens.map(token => ({
          ...token,
          totalSupply: atos(token.totalSupply, token.decimals),
          maxSupply: atos(token.maxSupply, token.decimals)
        })),
      total: state => state.total
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
    },
    getToken(tti) {
      tti = tti.trim();
      if (tti) {
        this.$router.push(`/token/${tti}`);
      }
    }
  },
  components: {
    VLink,
    Pagination
  }
};
</script>
