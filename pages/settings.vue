<template>
  <v-container class="pa-5">
    <h2 class="title">Preferences</h2>

    <v-col>
      <h3 class="subtitle-2 my-3">
        <v-icon left small>mdi-theme-light-dark</v-icon>Theme
      </h3>

      <v-btn-toggle
        v-model="selectedTheme"
        dense
        mandatory
        rounded
        @change="changeTheme"
      >
        <v-btn
          v-for="theme in themeIcons"
          :key="theme.name"
          :value="theme.name"
        >
          <v-icon>{{ theme.icon }}</v-icon>
        </v-btn>
      </v-btn-toggle>
    </v-col>

    <v-col>
      <h3 class="subtitle-2 my-3">
        <v-icon left small>mdi-cash</v-icon>Currency
      </h3>

      <v-btn-toggle v-model="selectedCurrency" dense mandatory rounded>
        <v-btn
          v-for="currency in currencyIcons"
          :key="currency.name"
          :value="currency.name"
        >
          <v-icon>{{ currency.icon }}</v-icon>
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
      themeIcons: [
        { name: 'light', icon: 'mdi-brightness-7' },
        { name: 'dark', icon: 'mdi-brightness-4' }
      ],
      selectedTheme: '',
      selectedCurrency: 0
    }
  },

  mounted() {
    this.selectedTheme =
      localStorage.getItem('darkMode') === 'true' ? 'dark' : 'light'
  },

  methods: {
    // TODO: Refactor using Vuex
    changeTheme() {
      const metaThemeColor = document.querySelector('meta[name=theme-color]')

      if (this.selectedTheme === 'dark') this.$vuetify.theme.dark = true
      else this.$vuetify.theme.dark = false

      if (localStorage)
        localStorage.setItem('darkMode', this.selectedTheme === 'dark')
      if (this.selectedTheme) {
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
