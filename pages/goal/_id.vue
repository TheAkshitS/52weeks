<template>
  <v-container>
    <v-row>
      <v-col
        ><h2 class="heading">{{ goal.name }}</h2></v-col
      >
      <v-col class="text-right">
        <v-btn icon>
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn></v-col
      >
    </v-row>
    <p>{{ goal }}</p>
  </v-container>
</template>

<script>
export default {
  computed: {
    goal() {
      return this.$store.getters['goal/goals'].find(
        (goal) => goal.id === Number(this.$route.params.id)
      )
    }
  },

  head() {
    return {
      title: `${this.goal.name}`
    }
  }
}
</script>
