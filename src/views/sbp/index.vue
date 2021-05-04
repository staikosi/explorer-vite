<template>
  <div class="uk-background-muted m-view">
    <div class="uk-padding">
      <p class="uk-text-lead">Super Nodes</p>
      <table class="uk-table uk-table-divider m-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Votes</th>
            <th>producer</th>
          </tr>
        </thead>
        <tbody class="uk-background-default">
          <tr v-for="(item, index) in sbps" :key="item.sbpName">
            <td>{{ index + 1 }}</td>
            <td>
              <router-link :to="'/sbps/' + item.sbpName">{{
                item.sbpName
              }}</router-link>
            </td>
            <td>{{ item.votes }}</td>
            <td class="m-address-tag m-text-truncate">
              {{ item.blockProducingAddress }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';

const { mapState, mapActions } = createNamespacedHelpers('sbp');

export default {
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.getSbps();
    });
  },
  computed: {
    ...mapState(['sbps'])
  },
  methods: {
    ...mapActions(['getSbps'])
  },
  components: {}
};
</script>

<style lang="less">
@import '~@/styles/vars.less';

.m-view {
  height: 100%;
}
.m-p {
  margin: 0;
}
.m-divider {
  height: auto;
  margin-top: 0;
  margin-bottom: 0;
}

.m-table {
  border: 1px solid @border;
}
</style>
