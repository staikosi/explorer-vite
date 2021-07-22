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
        // number
        vm.$router.push(`/snapshot/${value}`).catch(() => {});
      } else if (value.startsWith('tti_') && value.length === 28) {
        vm.$router.push(`/token/${value}`).catch(() => {});
      } else if (value.startsWith('vite_') && value.length === 55) {
        vm.$router.push(`/account/${value}`).catch(() => {});
      } else if (value.length === 64) {
        vm.$api.request('ledger_getAccountBlockByHash', value).then(block => {
          if (block) {
            vm.$router.push(`/tx/${value}`).catch(() => {});
          }
        });
        vm.$api.request('ledger_getSnapshotBlockByHash', value).then(block => {
          if (block) {
            vm.$router.push(`/snapshot/${value}`).catch(() => {});
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
