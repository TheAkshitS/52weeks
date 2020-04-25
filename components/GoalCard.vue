<template>
  <v-card
    class="mx-auto my-3"
    color="primary"
    dark
    width="320"
    :to="`/goal/${goal.id}`"
  >
    <div class="d-flex flex-no-wrap justify-space-between">
      <div>
        <v-card-title class="headline">{{ goal.name }}</v-card-title>

        <v-card-subtitle class="overline"
          ><v-icon left small class="ma">mdi-calendar-range</v-icon
          >{{ goal.startDate }}</v-card-subtitle
        >
        <v-card-subtitle
          ><v-icon left class="ma-0">mdi-cash</v-icon>
          {{ totalBalanceAtTheEnd.toLocaleString() }}</v-card-subtitle
        >
      </div>

      <v-avatar class="ma-1" size="125">
        <img
          src="@/assets/images/wallet.svg"
          loading="lazy"
          alt="Wallet image"
          class="wallet-image ma-5"
        />
        <!-- <v-progress-circular
          rotate="360"
          size="70"
          width="7"
          :value="value"
          class="overline"
          color="white"
        >
          {{ value }}
        </v-progress-circular> -->
      </v-avatar>
    </div>
    <v-progress-linear
      v-model="value"
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
      value: 30
    }
  },

  computed: {
    totalBalanceAtTheEnd() {
      const totalWeeks = 52
      let accountBalance = 0

      for (let week = 1; week <= totalWeeks; week++) {
        accountBalance = accountBalance + this.goal.amount * week
      }

      return accountBalance
    }
  }
}
</script>
