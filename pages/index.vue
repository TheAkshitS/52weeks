<template>
  <v-layout column justify-center align-center>
    <v-flex>
      <div>
        <img
          src="@/assets/images/wallet.svg"
          loading="lazy"
          alt="Wallet image"
          width="50%"
          class="wallet-image ma-5"
        />

        <!-- <v-fab-transition>
          <v-btn
            v-show="!hidden"
            relative
            bottom
            right
            fab
            dark
            color="primary"
            @click="sheet = true"
          >
            <v-icon dark>mdi-plus</v-icon>
          </v-btn>
        </v-fab-transition> -->
      </div>
    </v-flex>
  </v-layout>
</template>

<script>
// import SvgWallet from '@/components/SvgWallet'

export default {
  // components: {
  //   SvgWallet
  // },

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
