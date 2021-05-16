<template>
  <div class="uk-padding uk-background-default dashboard" uk-sticky>
    <div class="uk-flex uk-flex-middle">
      <div class="uk-card">
        <p class="m-p uk-text-muted">Block Height</p>
        <p class="m-p uk-text-bolder uk-text-emphasis">
          {{ withCommas(height) }}
        </p>
      </div>
      <hr class="uk-divider-vertical m-divider" />
      <search
        placeholder="Vite Address / Block Hash / Snapshot Block Height / Token Id"
        @search="search"
        class="uk-flex-1"
      />
      <!-- <div class="uk-card uk-flex-1">
          <p class="m-p uk-text-muted">Latest Version</p>
          <p class="m-p uk-text-bolder uk-text-emphasis">
            <a
              :href="
                'https://github.com/vitelabs/go-vite/releases/tag/' +
                  goViteVersion
              "
              target="_blank"
              >{{ goViteVersion }}</a
            >
          </p>
        </div>
        <hr class="uk-divider-vertical m-divider" />
        <div class="uk-card uk-flex-1">
          <p class="m-p uk-text-muted">Total Supply</p>
          <p class="m-p uk-text-bolder uk-text-emphasis">{{ circulating }}</p>
        </div>
        <hr class="uk-divider-vertical m-divider" />
        <div class="uk-card uk-flex-1">
          <p class="m-p uk-text-muted">VITE / BTC</p>
          <p class="m-p uk-text-bolder uk-text-emphasis">{{ priceToBTC }}</p>
        </div> -->
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import Search from '@/components/Search';
import { withCommas } from '@/utils/_';

export default {
  created: function () {
    this.getHeight().then(height => {
      console.log('current height: ' + height);
    });
  },
  computed: {
    ...mapState(['height'])
  },
  methods: {
    ...mapActions(['getHeight']),
    withCommas,
    search(value) {
      value = value.trim();
      if (!value) {
        return;
      }
      let vm = this;
      if (/^-?\d+$/.test(value)) {
        vm.$router.push(`/snapshots/${value}`);
      } else if (value.startsWith('tti_') && value.length === 28) {
        vm.$router.push(`/tokens/${value}`);
      } else if (value.startsWith('vite_') && value.length === 55) {
        vm.$router.push(`/accounts/${value}`);
      } else if (value.length === 64) {
        vm.$api.request('ledger_getAccountBlockByHash', value).then(block => {
          if (block) {
            vm.$router.push(`/txs/${value}`);
          }
        });
        vm.$api.request('ledger_getSnapshotBlockByHash', value).then(block => {
          if (block) {
            vm.$router.push(`/snapshots/${value}`);
          }
        });
      }
      console.log('search ' + value + ', length:' + value.length);
      console.log('' + vm.$router.currentRoute.path);
    }
  },
  components: {
    Search
  }
};
</script>

<style>
.v-layout {
  min-height: 100%;
}
</style>
