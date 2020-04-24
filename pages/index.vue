<template>
  <v-container>
    <v-row>
      <GoalCard v-for="i in 10" :key="i" :index="i" />
    </v-row>

    <img
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
import GoalCard from '@/components/GoalCard'
export default {
  components: {
    GoalCard
  },

  data() {
    return {}
  },

  head() {
    return {
      title: 'Home',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Home 52weeks money challenge'
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
