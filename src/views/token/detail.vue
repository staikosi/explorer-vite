<template>
  <div class="uk-background-muted m-view">
    <div class="uk-padding">
      <p class="uk-text-lead">Token Detail</p>

      <table class="uk-table uk-table-divider">
        <tbody class="uk-background-default">
          <tr>
            <td>Token Symbol</td>
            <td>{{ token.tokenSymbolView }}</td>
          </tr>
          <tr>
            <td>Token Name</td>
            <td>{{ token.tokenName }}</td>
          </tr>
          <tr>
            <td>Decimals</td>
            <td>{{ token.decimals }}</td>
          </tr>
          <tr>
            <td>Total Supply</td>
            <td>{{ token.totalSupply }}</td>
          </tr>
          <tr>
            <td>Token tti</td>
            <td>{{ token.tokenId }}</td>
          </tr>
          <tr>
            <td>Reissuable</td>
            <td>{{ token.isReIssuable }}</td>
          </tr>
          <tr>
            <td>Owner Burn Only</td>
            <td>{{ token.isOwnerBurnOnly }}</td>
          </tr>
          <tr>
            <td>Issuer</td>
            <td>
              <v-link prefix="/accounts/" :value="token.owner" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import VLink from '@/components/Link';

const { mapState, mapActions } = createNamespacedHelpers('token');

export default {
  beforeRouteEnter(to, from, next) {
    const tti = to.params.tid;
    next(vm => {
      vm.getToken(tti);
    });
  },
  beforeRouteUpdate(to, from, next) {
    const tti = to.params.tid;
    this.getToken(tti).then(() => next());
  },
  data() {
    return {
      loading: false
    };
  },
  computed: {
    ...mapState({
      token: state => state.token
    })
  },
  methods: {
    ...mapActions(['getTokenDetails']),
    getToken(tti) {
      if (this.loading) {
        return;
      }
      this.loading = true;
      this.getTokenDetails(tti).finally(() => {
        this.loading = false;
      });
    }
  },
  components: {
    VLink
  }
};
</script>
