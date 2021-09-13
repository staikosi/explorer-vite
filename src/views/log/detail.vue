<template>
  <div class="uk-background-muted">
    <div class="uk-padding">
      <p class="uk-text-lead">Event Detail</p>

      <table class="uk-table uk-table-divider" v-if="logs">
        <tbody class="uk-background-default">
          <tr v-for="item in events" :key="item.id">
            <td>{{ item.name }}</td>
            <td>
              <textarea
                class="uk-textarea uk-form-small uk-width-2-3"
                rows="6"
                placeholder=""
                v-model="item.inputs"
              ></textarea>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import { abi } from '@vite/vitejs';
import beautify from 'json-beautify';
import { atos, blockTypeText, isReceive } from '@/utils/_';
import { isDexContract, decodeDexLog } from '@/utils/vx';

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
    ...mapActions(['getAbi']),
    atos,
    blockTypeText,
    isReceive,
    async getLogs(hash) {
      const logs = await this.$api.request('ledger_getVmLogListByHash', hash);
      this.logs = JSON.stringify(logs);
      const abiObj = await this.getAbi(this.curAddr);

      // console.log(abiObj);
      logs.forEach(log => {
        if (isDexContract(this.curAddr)) {
          const result = decodeDexLog(log);
          this.events.push({
            id: log.topics[0],
            name: result.name,
            inputs: beautify(result.inputs, null, 2, 100)
          });
          return;
        }
        // console.log(log, log['topics'], log['topics'][0]);
        const abiItem = abiObj.find(item => item.id === log.topics[0]);
        // console.log(abiItem);
        const result = abi.decodeLog(
          abiObj,
          Buffer.from(log.data ? log.data : '', 'base64').toString('hex'),
          log.topics.slice(1, log.topics.length),
          abiItem.name
        );
        // console.log(abiItem['name'], result);
        this.events.push({
          id: log.topics[0],
          name: abiItem.name,
          // inputs: JSON.stringify(result, null, 2, 100)
          inputs: beautify(result, null, 2, 100)
        });
      });
    }
  },
  components: {}
};
</script>
