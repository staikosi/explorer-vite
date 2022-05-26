<template>
  <div class="uk-padding uk-background-default dashboard">
    <div class="uk-flex uk-flex-middle">
      <div class="uk-padding-small uk-padding-remove-left">
        <button
          uk-icon="icon: menu; ratio: 1.3"
          uk-toggle="target: #offcanvas-overlay"
          style="width: 30px"
        ></button>
      </div>
      <div class="uk-card">
        <p class="m-p uk-text-muted">Block Height</p>
        <p class="m-p uk-text-bolder uk-text-emphasis">
          {{ withCommas(height) }}
        </p>
      </div>
      <hr class="uk-divider-vertical m-divider" />
      <search
        placeholder="Address / Hash / Height / Token Id / Address:Height"
        @search="search"
        class="uk-flex-1"
      />
      <hr class="uk-divider-vertical m-divider" />
      <div class="uk-card">
        <a class="uk-link-text" href="https://mainnet.viteview.xyz">Mainnet</a>
      </div>
      <div class="uk-card uk-margin-left">
        <a class="uk-link-text" href="https://buidl.viteview.xyz">Buidl</a>
      </div>
      <div class="uk-card uk-margin-left">
        <a class="uk-link-text" href="http://viteview.xyz">Custom</a>
      </div>
    </div>
  </div>
</template>

<script>
import UIkit from 'uikit';
import { mapState, mapActions } from 'vuex';
import Search from '@/components/Search';
import { withCommas } from '@/utils/_';
import { isHash, isAddress, isTti } from '@/utils/vite';

export default {
  created() {
    this.getHeight().then(height => {
      console.log(`current height: ${height}`);
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
      const vm = this;
      if (/^-?\d+$/.test(value)) {
        // is number ?
        vm.$router.push(`/snapshot/${value}`).catch(() => {});
      } else if (isTti(value)) {
        vm.$router.push(`/token/${value}`).catch(() => {});
      } else if (isAddress(value)) {
        vm.$router.push(`/account/${value}`).catch(() => {});
      } else if (isHash(value)) {
        if (value.startsWith('0x')) {
          value = value.slice(2);
        }
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
      } else if (value.indexOf(':') > 0) {
        const keys = value.split(':');
        if (
          keys.length === 2 &&
          isAddress(keys[0]) &&
          /^-?\d+$/.test(keys[1])
        ) {
          vm.$router.push(`/tx/${keys[0]}/${keys[1]}`).catch(() => {});
        } else {
          UIkit.notification({
            message: `Invalid Search Context`,
            status: 'warning',
            timeout: 1000
          });
        }
      } else {
        UIkit.notification({
          message: `Invalid Search Context`,
          status: 'warning',
          timeout: 1000
        });
      }

      console.log(`search ${value}, length:${value.length}`);
      console.log(`${vm.$router.currentRoute.path}`);
    }
  },
  components: {
    Search
  }
};
</script>
