<template>
  <div class="uk-background-muted m-view">
    <div class="uk-padding">
      <p class="uk-text-lead">
        {{ sbpstat.name }}
      </p>

      <table class="uk-table uk-table-divider">
        <tbody class="uk-background-default">
          <tr>
            <td>Total Votes</td>
            <td>{{ sbpstat.voteCnt }}</td>
          </tr>
          <tr>
            <td>Stats</td>
            <td>
              {{
                sbpstat.blockNum +
                '/' +
                sbpstat.exceptedBlockNum +
                '(' +
                (sbpstat.blockNum / sbpstat.exceptedBlockNum).toFixed(4) +
                ')'
              }}
            </td>
          </tr>
          <tr>
            <td>Coinbase</td>
            <td>
              <v-link
                prefix="/accounts/"
                :value="sbpstat.blockProducingAddress"
                full="true"
              />
            </td>
          </tr>
          <tr>
            <td>Owner</td>
            <td>
              <v-link
                prefix="/accounts/"
                :value="sbpstat.stakeAddress"
                full="true"
              />
            </td>
          </tr>
          <tr>
            <td>Withdrawal Account</td>
            <td>
              <v-link
                prefix="/accounts/"
                :value="sbpstat.rewardWithdrawAddress"
                full="true"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="uk-padding">
      <p class="uk-text-lead">Rewards</p>
      <table class="uk-table uk-table-divider">
        <thead>
          <tr>
            <th>Cycle</th>
            <th>Time</th>
            <th>Rewards of Blocks</th>
            <th>Rewards of Votes</th>
            <th>Total Rewards</th>
          </tr>
        </thead>
        <tbody class="uk-background-default">
          <tr v-for="item in sbpRewards" :key="item.cycle">
            <td>{{ item.cycle }}</td>
            <td>
              {{
                new Date(item.startTime * 1000).toLocaleString() +
                ' - ' +
                new Date(item.endTime * 1000).toLocaleString()
              }}
            </td>
            <td>{{ item.blockProducingReward }} VITE</td>
            <td>{{ item.votingReward }} VITE</td>
            <td>{{ item.totalReward }} VITE</td>
          </tr>
        </tbody>
      </table>

      <pagination :page-num="pageNum" @select="getRewards" />
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import Pagination from '@/components/Pagination';
import VLink from '@/components/Link';

const {
  mapState,
  mapActions,
  mapGetters,
  mapMutations
} = createNamespacedHelpers('sbp');

export default {
  beforeRouteEnter(to, from, next) {
    const sbpName = to.params.name;
    next((vm) => {
      vm.loadData(sbpName);
    });
  },
  beforeRouteUpdate(to, from, next) {
    const sbpName = to.params.name;
    this.loadData(sbpName).then(() => next());
  },
  computed: {
    ...mapState(['sbpstat', 'sbpName', 'dayIndex', 'pageSize', 'sbpRewards']),
    ...mapGetters(['pageNum', 'rewardsView'])
  },
  methods: {
    ...mapMutations(['updateRewards']),
    ...mapActions([
      'getSbpStats',
      'getHourSbpStats',
      'getSbp',
      'setSbpName',
      'getDayIndex'
    ]),
    getRewards(page) {
      const offset = (page - 1) * this.pageSize;
      const end = Math.max(this.dayIndex - offset, 1);
      let start = end > this.pageSize ? end - this.pageSize : 1;
      const promises = [];
      const rewards = [];
      console.log(this.dayIndex, start, end);
      while (start < end) {
        promises.unshift(
          this.$api
            .request('contract_getSBPRewardByCycle', '' + start)
            .then((res) => {
              rewards.push(res);
            })
            .catch((err) => console.log(err))
        );
        start++;
      }

      return Promise.all(promises)
        .then(() => {
          this.updateRewards(rewards);
        })
        .finally(() => {
          this.loading = false;
        });
    },
    loadData(sbpName) {
      const vm = this;
      const page = 1;
      return vm.getDayIndex().then(() => {
        Promise.all([
          vm.getSbpStats(),
          vm.getHourSbpStats(),
          vm.getSbp(sbpName)
        ])
          .then(() => {
            vm.setSbpName(sbpName);
          })
          .then(() => {
            vm.getRewards(page);
          });
      });
    }
  },
  components: {
    Pagination,
    VLink
  }
};
</script>
