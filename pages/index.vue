<template>
  <v-container>
    <v-row v-if="goals.length" class="mt-2">
      <v-col>
        <GoalCard
          v-for="goal in goals"
          :key="goal.id"
          :goal="goal"
          nuxt
          @click="setGoal(goal)"
        />
      </v-col>
    </v-row>
    <v-row v-else>
      <v-col class="grey--text">
        <p>You haven't added any goals yet.</p>
        <img
          src="@/assets/images/piggy_bank.svg"
          loading="lazy"
          alt="Piggybank background image"
          height="200vh"
          class="bg-image"
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

  computed: {
    goals() {
      return this.$store.state.goal.goals
    }
  },

  methods: {
    setGoal(goal) {
      this.$store.commit('goal/SELECT_GOAL', goal)
      this.$router.push(`/goal/${goal.id}`)
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

<style>
.bg-image {
  z-index: 0;
  position: absolute;
  right: 0;
  bottom: 0;
}
</style>
