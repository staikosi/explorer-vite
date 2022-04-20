<template>
  <div>
    <div class="uk-panel uk-text-break uk-text-small" style="width: 700px">
      hex: {{ bytesVal }}
    </div>
    <hr />
    <div class="uk-panel uk-text-break uk-text-small" style="width: 700px">
      base64: {{ value }}
    </div>
    <hr v-if="parameters" />
    <div
      v-if="parameters"
      class="uk-panel uk-text-break uk-text-small"
      style="width: 700px"
    >
      abi.decode: {{ parameters }}
    </div>
    <hr v-if="withdrawInfo" />
    <div
      v-if="withdrawInfo"
      class="uk-panel uk-text-break uk-text-small"
      style="width: 700px"
    >
      withdraw.decode: {{ withdrawInfo }}
    </div>
    <hr />
    <div>
      <button
        type="button"
        class="uk-button-default uk-button-small uk-margin-left"
        @click="decodeWithdrawInfo"
      >
        decode as withdraw
      </button>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import { abi } from '@vite/vitejs';
import { decodeWithdrawData } from '@/utils/vite';

const { mapActions } = createNamespacedHelpers('account');

export default {
  props: {
    value: String,
    to: String,
    blockType: Number
  },
  data() {
    return {
      addr_abi: undefined,
      withdrawInfo: undefined
    };
  },

  computed: {
    bytesVal() {
      const result = Buffer.from(this.value, 'base64').toString('hex');
      return result;
    },
    parameters() {
      // console.log(viteAbi);
      if (this.addr_abi && this.blockType === 2) {
        const contractAbi = this.addr_abi;
        // console.log(contractAbi);
        const id = Buffer.from(this.value, 'base64')
          .slice(0, 4)
          .toString('hex');
        // console.log(id, JSON.stringify(contractAbi));
        const abi_json = contractAbi.find(x => x.id === id);

        // console.log(JSON.stringify(abi_json));

        const params = Buffer.from(this.value, 'base64')
          .slice(4)
          .toString('hex');
        // console.log(abi_json, params);

        if (id === Buffer.from(this.value, 'base64').toString('hex')) {
          return [abi_json.name, '[]'];
        }
        console.log(JSON.stringify(abi_json));
        return [abi_json.name, ...abi.decodeParameters(abi_json, params)];
      }
      return undefined;
    }
  },
  methods: {
    ...mapActions(['getAbi']),
    decodeWithdrawInfo() {
      this.withdrawInfo = decodeWithdrawData(this.value);
    }
  },
  created() {
    this.getAbi(this.to).then(abi => {
      this.addr_abi = abi;
    });
  }
};
</script>
