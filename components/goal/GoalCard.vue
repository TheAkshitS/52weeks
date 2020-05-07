<template>
  <v-card
    class="mx-auto my-3"
    color="primary"
    dark
    width="320"
    v-on="$listeners"
  >
    <div class="d-flex flex-no-wrap justify-space-between">
      <div>
        <v-card-title class="headline">{{ goal.name }}</v-card-title>

        <v-card-subtitle class="overline"
          ><v-icon left small class="ma">mdi-calendar-range</v-icon
          >{{
            $dayjs(goal.startDate)
              .add(52, 'week')
              .format('DD/MM/YY')
          }}</v-card-subtitle
        >
        <v-card-subtitle
          ><v-icon left class="ma-0">mdi-cash</v-icon>
          {{
            goal.finalGoalAmount.toLocaleString() | currency
          }}</v-card-subtitle
        >
      </div>

      <v-avatar class="ma-1 pt-3 pr-2" size="125">
        <img
          src="@/assets/images/wallet.svg"
          loading="lazy"
          alt="Wallet image"
          class="wallet-image ma-5"
        />
      </v-avatar>
    </div>
    <v-progress-linear
      v-model="totalGoalProgress"
      height="5"
      color="green"
    ></v-progress-linear>
  </v-card>
</template>

<script>
export default {
  props: {
    goal: {
      type: Object,
      required: true
    }
  },

  data() {
    return {
      totalGoalProgress: 100
    }
  },

  created() {
    this.calculateValues()
  },

  methods: {
    calculateValues() {
      let weeklyGoalCompleted = 0

      this.goal.weeklyGoals.forEach((goal) => {
        if (goal.status) weeklyGoalCompleted++
      })

      this.totalGoalProgress = Math.floor((weeklyGoalCompleted / 52) * 100)
    }
  }
}
</script>
