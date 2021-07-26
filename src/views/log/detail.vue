<template>
  <div class="uk-background-muted">
    <div class="uk-padding">
      <p class="uk-text-lead">Event Detail</p>

      <table class="uk-table uk-table-divider" v-if="logs">
        <tbody class="uk-background-default">
          <tr>
            <td>Height</td>
            <td>
              <textarea v-model="logs"> </textarea>
            </td>
          </tr>
          <tr>
            <td>Hash</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { atos, blockTypeText, isReceive } from '@/utils/_';

export default {
  beforeRouteEnter(to, from, next) {
    const hash = to.params.hash;
    next(vm => vm.getLogs(hash));
  },
  beforeRouteUpdate(to, from, next) {
    const hashto = to.params.hash;
    this.getLogs(hashto).then(() => next());
  },
  data() {
    return {
      logs: null
    };
  },
  methods: {
    atos,
    blockTypeText,
    isReceive,
    getLogs(hash) {
      this.$api.request('ledger_getVmLogListByHash', hash).then(logs => {
        this.logs = JSON.stringify(logs);
        //  Object.seal(logs);
      });
    }
  },
  components: {}
};
</script>
