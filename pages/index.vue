<template>
  <v-container>
    <v-row v-if="goals.length" class="mt-2">
      <v-col>
        <GoalCard v-for="goal in goals" :key="goal.id" :goal="goal" />
      </v-col>
    </v-row>
    <v-row v-else>
      <v-col class="ma-5 grey--text">
        <p>You haven't added any goals yet.</p>
        <img
          style="z-index: 0"
          src="@/assets/images/wallet.svg"
          loading="lazy"
          alt="Wallet image"
          width="50%"
          class="wallet-image ma-5"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import GoalCard from '@/components/goal/GoalCard'

export default {
  components: {
    GoalCard
  },

  data() {
    return {}
  },

  computed: {
    goals() {
      return this.$store.getters['goal/goals']
    }
  },

  head() {
    return {
      title: 'Home',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Home 52 weeks money challenge'
        }
      ]
    }
  }
}
</script>

<style scoped>
.wallet-image {
  position: absolute;
  right: 0;
  bottom: 0;
}
</style>
