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
import { vite_abi } from '@/utils/vite';
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
      // console.log(vite_abi);

      if (this.addr_abi && this.blockType === 2) {
        const contract_abi = this.addr_abi;
        // console.log(contract_abi);
        const id = Buffer.from(this.value, 'base64')
          .slice(0, 4)
          .toString('hex');
        console.log(contract_abi);
        console.log(vite_abi);
        const abi_json = contract_abi.find(x => x['id'] === id);

        const params = Buffer.from(this.value, 'base64')
          .slice(4)
          .toString('hex');
        // console.log(abi_json, params);
        return [abi_json['name'], ...abi.decodeParameters(abi_json, params)];
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
