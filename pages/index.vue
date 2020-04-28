<template>
  <v-container>
    <v-row v-if="goals.length" class="mt-2">
      <GoalCard v-for="goal in goals" :key="goal.id" :goal="goal" />
    </v-row>

    <img
      v-else
      style="z-index: 0"
      src="@/assets/images/wallet.svg"
      loading="lazy"
      alt="Wallet image"
      width="50%"
      class="wallet-image ma-5"
    />
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
          content: '52 weeks money challenge'
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
