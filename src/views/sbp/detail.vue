<template>
  <div class="uk-background-muted m-view">
    <div class="uk-padding">
      <p class="uk-text-lead">
        {{ sbpstat.name }}
      </p>

      <table class="uk-table uk-table-divider m-table">
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
            <td>{{ sbpstat.blockProducingAddress }}</td>
          </tr>
          <tr>
            <td>Owner</td>
            <td>{{ sbpstat.stakeAddress }}</td>
          </tr>
          <tr>
            <td>Withdrawal Account</td>
            <td>{{ sbpstat.rewardWithdrawAddress }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="uk-padding">
      <p class="uk-text-lead">Rewards</p>
      <table class="uk-table uk-table-divider m-table">
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
            <td>{{ item.blockProducingReward }}</td>
            <td>{{ item.votingReward }}</td>
            <td>{{ item.totalReward }}</td>
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

const {
  mapState,
  mapActions,
  mapGetters,
  mapMutations
} = createNamespacedHelpers('sbp');

export default {
  beforeRouteEnter(to, from, next) {
    const sbpName = to.params.name;
    const page = 1;
    next((vm) => {
      vm.getDayIndex().then(() => {
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
    });
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
    }
  },
  components: {
    Pagination
  }
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
