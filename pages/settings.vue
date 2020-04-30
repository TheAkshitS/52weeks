<template>
  <v-container class="pa-5">
    <h2 class="title">Preferences</h2>

    <v-col>
      <h3 class="subtitle-2 my-3">
        <v-icon left small>mdi-theme-light-dark</v-icon>Theme
      </h3>

      <v-btn-toggle v-model="theme" mandatory rounded>
        <v-btn>
          <v-icon>mdi-brightness-7</v-icon>
        </v-btn>
        <v-btn>
          <v-icon>mdi-brightness-4</v-icon>
        </v-btn>
      </v-btn-toggle>
    </v-col>

    <v-col>
      <h3 class="subtitle-2 my-3">
        <v-icon left small>mdi-cash</v-icon>Currency
      </h3>

      <v-btn-toggle v-model="currency" mandatory rounded>
        <v-btn v-for="button in currencyIcons" :key="button.name">
          <v-icon>{{ button.icon }}</v-icon>
        </v-btn>
      </v-btn-toggle>
    </v-col>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      currencyIcons: [
        { name: 'inr', icon: 'mdi-currency-inr' },
        { name: 'usd', icon: 'mdi-currency-usd' },
        { name: 'eur', icon: 'mdi-currency-eur' },
        { name: 'gbp', icon: 'mdi-currency-gbp' }
      ],
      theme: 1,
      currency: 0
    }
  },

  methods: {
    changeTheme() {
      const metaThemeColor = document.querySelector('meta[name=theme-color]')

      this.$vuetify.theme.dark = !this.$vuetify.theme.dark
      if (localStorage)
        localStorage.setItem('darkMode', this.$vuetify.theme.dark)
      if (this.$vuetify.theme.dark) {
        metaThemeColor.setAttribute('content', '#212121')
      } else {
        metaThemeColor.setAttribute('content', '#0277bd')
      }
    }
  },

  head() {
    return {
      title: 'Settings'
    }
  }
}
</script>
