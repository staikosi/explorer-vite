<template>
  <div>
    <div class="uk-panel uk-text-break uk-text-small" style="width: 700px">
      {{ value }}
    </div>
    <div class="uk-panel uk-text-break uk-text-small" style="width: 700px">
      {{ parameters }}
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import { abi } from '@vite/vitejs';

const { mapActions } = createNamespacedHelpers('account');

export default {
  props: {
    value: String,
    to: String,
    blockType: Number
  },
  data() {
    return {
      addr_abi: undefined
    };
  },

  computed: {
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
    ...mapActions(['getAbi'])
  },
  created() {
    this.getAbi(this.to).then(abi => {
      this.addr_abi = abi;
    });
  }
};
</script>
