<template>
  <v-container class="pa-5">
    <v-row class="ml-1">
      <h2 class="title">Preferences</h2>
    </v-row>

    <v-row>
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
          <v-btn v-for="theme in themes" :key="theme.name" :value="theme.name">
            <v-icon>{{ theme.icon }}</v-icon>
          </v-btn>
        </v-btn-toggle>

        <h3 class="subtitle-2 mt-5 my-3">
          <v-icon left small>mdi-cash</v-icon>Currency
        </h3>

        <v-btn-toggle v-model="selectedCurrency" dense mandatory rounded>
          <v-btn
            v-for="currency in currencies"
            :key="currency.name"
            :value="currency"
          >
            <v-icon>{{ currency.icon }}</v-icon>
          </v-btn>
        </v-btn-toggle>
      </v-col>
    </v-row>

    <v-row>
      <v-col class="grey--text">
        <p>You haven't added any goals yet.</p>
        <img
          src="@/assets/images/settings.svg"
          loading="lazy"
          alt="Settings background image"
          height="200vh"
          class="bg-image"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      themes: [
        { name: 'light', icon: 'mdi-brightness-7' },
        { name: 'dark', icon: 'mdi-brightness-4' }
      ],
      selectedTheme: ''
    }
  },

  computed: {
    currencies() {
      return this.$store.state.settings.currencies
    },

    selectedCurrency: {
      get() {
        return this.$store.state.settings.selectedCurrency
      },

      set(value) {
        this.$store.commit('settings/SET_CURRENCY', value)
      }
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
