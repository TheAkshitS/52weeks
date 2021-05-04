<template>
  <v-app>
    <!-- APP BAR -->
    <v-app-bar fixed app flat>
      <v-toolbar-title>
        <v-icon left color="primary" name="navigation" @click="changeRoute">
          {{
            $route.name === 'index'
              ? 'mdi-cash-multiple'
              : 'mdi-keyboard-backspace'
          }}
        </v-icon>
        <n-link to="/" style="text-decoration: none"
          >52 Weeks
          <span class="font-weight-medium">Money Challenge</span></n-link
        ></v-toolbar-title
      >
      <v-spacer />
      <template v-slot:extension>
        <v-fab-transition>
          <v-tooltip left>
            <template v-slot:activator="{ on }">
              <v-btn
                v-show="!hidden && $route.name === 'index'"
                small
                fab
                bottom
                right
                absolute
                color="primary"
                name="add goal"
                v-on="on"
                @click="sheet = true"
              >
                <v-icon>mdi-plus</v-icon>
              </v-btn>
            </template>
            <span>Create a new Goal</span>
          </v-tooltip>
        </v-fab-transition>
      </template>
      <div v-for="item in navItems" :key="item.title" class="mr-2">
        <v-btn
          class="ml-2 d-none d-sm-flex text-capitalize font-weight-light"
          :to="item.to"
          nuxt
          text
          >{{ item.title }}</v-btn
        >
      </div>

      <v-btn icon nuxt name="settings" to="/settings"
        ><v-icon>mdi-cog-outline</v-icon></v-btn
      >
    </v-app-bar>

    <!-- MAIN CONTENT -->
    <v-main>
      <nuxt />
    </v-main>

    <!-- FOOTER -->
    <goal-create :sheet.sync="sheet" />

    <app-bottom-nav :nav-items="navItems" />

    <app-snackbar />
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      title: '52 Weeks Money Challenge 💪',
      activeBtn: 1,
      drawer: false,
      hidden: true,

      requiredRules: [(v) => !!v || 'Name is required'],
      navItems: [
        {
          icon: 'mdi-target',
          title: 'My Goals',
          to: '/',
        },
        {
          icon: 'mdi-information-outline',
          title: 'About',
          to: '/about',
        },
      ],
      sheet: false,
    }
  },

  created() {
    // TODO: Refactor this
    localStorage.getItem('darkMode') === 'true'
      ? (this.$vuetify.theme.dark = true)
      : (this.$vuetify.theme.dark = false)
  },

  mounted() {
    this.hidden = false
  },

  methods: {
    changeRoute() {
      if (this.$route.name !== 'index') this.$router.push('/')
    },
  },
}
</script>

<style scoped>
.page-enter-active {
  transition: opacity 0.5s;
}

.page-enter {
  opacity: 0;
}
</style>

// Global styles
<style>
html {
  overflow-y: auto;
}

.bg-image {
  z-index: 0;
  position: absolute;
  right: 0;
  bottom: 0;
}
</style>
