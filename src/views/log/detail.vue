<template>
  <div class="uk-background-muted">
    <div class="uk-padding">
      <p class="uk-text-lead">Event Detail</p>

      <table class="uk-table uk-table-divider" v-if="logs">
        <tbody class="uk-background-default">
          <tr v-for="item in events" :key="item.id">
            <td>{{ item.name }}</td>
            <td>
              <textarea v-model="item.inputs"> </textarea>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import { atos, blockTypeText, isReceive } from '@/utils/_';
import { fill_id } from '@/utils/vite';
import { abi } from '@vite/vitejs';

const { mapActions } = createNamespacedHelpers('account');

export default {
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.curAddr = to.params.address;
      vm.curLogHash = to.params.hash;
      return vm.getLogs(vm.curLogHash);
    });
  },
  beforeRouteUpdate(to, from, next) {
    this.curLogHash = to.params.hash;
    this.curAddr = to.params.address;
    this.getLogs(this.curLogHash).then(() => next());
  },
  data() {
    return {
      curAddr: '',
      curLogHash: '',
      logs: null,
      events: []
    };
  },
  methods: {
    ...mapActions(['getAbiJson']),
    atos,
    blockTypeText,
    isReceive,
    async getLogs(hash) {
      const logs = await this.$api.request('ledger_getVmLogListByHash', hash);
      this.logs = JSON.stringify(logs);
      const abiJson = await this.getAbiJson(this.curAddr);
      // console.log(abiJson);
      const abiObj = fill_id(JSON.parse(abiJson));

      // console.log(abiObj);
      logs.forEach(log => {
        // console.log(log, log['topics'], log['topics'][0]);
        const abiItem = abiObj.find(item => item['id'] === log['topics'][0]);
        // console.log(abiItem);
        const result = abi.decodeLog(
          abiObj,
          Buffer.from(log['data'], 'base64').toString('hex'),
          log['topics'],
          abiItem['name']
        );
        // console.log(abiItem['name'], result);
        this.events.push({
          id: log['topics'][0],
          name: abiItem['name'],
          inputs: JSON.stringify(result)
        });
      });
    }
  },
  components: {}
};
</script>
