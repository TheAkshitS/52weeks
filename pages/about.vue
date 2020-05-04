<template>
  <v-container class="pa-5">
    <v-row>
      <v-col>
        <h2 class="title mb-1">52 weeks money challenge</h2>
        <p class="body-1">
          The idea is simple: You start by socking away just $1 in the first
          week of the year, and then gradually increase your savings by a dollar
          a week throughout the year. So you save $2 in Week 2, then $3 in Week
          3, and so on, until you’re stashing away upwards of $50 a week next
          December. By the end of the year, if you complete the challenge,
          you’ll have saved $1,378.
        </p>
        <img
          class="test ma-5"
          src="@/assets/images/savings.svg"
          loading="lazy"
          alt="Wallet image"
          width="50%"
        />
      </v-col>
    </v-row>

    <v-footer absolute color="transparent">
      <v-col class="text-center pa-0 overline">
        <div>
          Made with ❤ by
          <a target="_blank" href="https://akshit.dev">Akshit</a>
        </div>
      </v-col>
    </v-footer>
  </v-container>
</template>

<script>
export default {
  head() {
    return {
      title: 'About',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'About 52 weeks money challenge'
        }
      ]
    }
  }
}
</script>

<style scoped>
.test {
  position: absolute;
  right: 0;
  bottom: 0;
}
</style>
