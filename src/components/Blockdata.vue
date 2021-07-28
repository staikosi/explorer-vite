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
import { vite_abi } from '@/utils/vite';
import { abi } from '@vite/vitejs';

export default {
  props: {
    value: String,
    to: String,
    blockType: Number
  },

  computed: {
    parameters() {
      // console.log(vite_abi);
      const contract_abi = vite_abi[this.to];
      if (contract_abi && this.blockType === 2) {
        // console.log(contract_abi);
        const id = Buffer.from(this.value, 'base64')
          .slice(0, 4)
          .toString('hex');

        const abi_json = contract_abi.find(x => x['id'] === id);

        const params = Buffer.from(this.value, 'base64')
          .slice(4)
          .toString('hex');
        // console.log(abi_json, params);
        return [abi_json['name'], ...abi.decodeParameters(abi_json, params)];
      }
      return undefined;
    }
  }
};
</script>
