<template>
  <v-card
    class="mx-auto my-3"
    color="primary"
    dark
    width="320"
    :to="`/goal/${index}`"
  >
    <div class="d-flex flex-no-wrap justify-space-between">
      <div>
        <v-card-title class="headline">Test run</v-card-title>

        <v-card-subtitle>Feb 21</v-card-subtitle>
        <v-card-subtitle>$1,236</v-card-subtitle>
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
      color="secondary"
    ></v-progress-linear>
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
