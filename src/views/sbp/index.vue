<template>
  <div class="uk-background-muted m-view">
    <div class="uk-padding">
      <p class="uk-text-lead">Super Nodes</p>
      <table class="uk-table uk-table-divider">
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
              <v-link prefix="/sbps/" :value="item.sbpName" />
            </td>
            <td>{{ item.votes }}</td>
            <td class="m-hash-tag m-text-truncate">
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
import VLink from '@/components/Link';

const { mapState, mapActions } = createNamespacedHelpers('sbp');

export default {
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.getSbps();
    });
  },
  computed: {
    ...mapState(['sbps'])
  },
  methods: {
    ...mapActions(['getSbps'])
  },
  components: {
    VLink
  }
};
</script>
