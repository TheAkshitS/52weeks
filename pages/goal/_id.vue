<template>
  <v-container>
    <!-- <v-flex> -->
    <v-row>
      <v-col> <h2 class="heading">Details</h2></v-col>
      <v-col class="text-right">
        <v-btn icon>
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn></v-col
      >
    </v-row>

    <!-- </v-flex> -->
    <p>{{ goal }}</p>
  </v-container>
</template>

<script>
export default {
  computed: {
    goal() {
      return this.$store.getters.goals.find(
        (goal) => goal.id === Number(this.$route.params.id)
      )
    }
  }
}
</script>
