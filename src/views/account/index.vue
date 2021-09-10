<template>
  <div class="uk-background-muted">
    <div class="uk-padding">
      <p class="uk-text-lead">Accounts</p>
      <table class="uk-table uk-table-divider">
        <tbody class="uk-background-default">
          <tr v-for="item in accounts" :key="item.address">
            <td>
              <v-link prefix="/account/" :value="item.address" :full="true" />
            </td>
            <td>{{ item.desc }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import VLink from '@/components/Link';
import { builtinContracts } from '@/utils/consts';

export default {
  data() {
    return {};
  },
  computed: {
    accounts() {
      return builtinContracts;
    }
  },
  methods: {},
  components: {
    VLink
  }
};
</script>
