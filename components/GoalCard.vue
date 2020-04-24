<template>
  <v-card
    class="mx-auto my-5"
    color="primary"
    dark
    max-width="300"
    :to="`/goal/${index}`"
  >
    <v-card-title>
      <v-icon large left>
        mdi-target
      </v-icon>
      <span class="title">Goal name</span>
      <v-spacer />
      <v-progress-circular
        rotate="360"
        size="40"
        width="4"
        :value="value"
        class="overline"
        color="white"
      >
        {{ value }}
      </v-progress-circular>
    </v-card-title>

    <v-card-text class="title">
      <div></div>
      "Turns out semicolon-less style is easier and safer in TS because most
      gotcha edge cases are type invalid as well."
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: {
    index: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      value: 30
    }
  }
}
</script>
