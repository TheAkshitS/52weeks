<template>
  <v-app>
    <!-- LEFT NAVIGATION DRAWER -->
    <!-- <v-navigation-drawer v-model="drawer" app temporary>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title
            >52 Weeks
            <span class="font-weight-medium"
              >Money Challenge 💪</span
            ></v-list-item-title
          >
        </v-list-item-content>
      </v-list-item>
      <v-divider></v-divider>
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          dense
          shaped
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer> -->

    <!-- APP BAR -->
    <v-app-bar fixed app flat>
      <!-- <v-app-bar-nav-icon
        class="d-md-none d-lg-none"
        @click.stop="drawer = !drawer"
      /> -->
      <v-toolbar-title
        ><n-link to="/" style="text-decoration: none;"
          >52 Weeks
          <span class="font-weight-medium">Money Challenge 💸</span></n-link
        ></v-toolbar-title
      >
      <v-spacer />
      <template v-slot:extension>
        <v-fab-transition>
          <v-btn
            v-show="!hidden && $route.name === 'index'"
            small
            fab
            bottom
            right
            absolute
            color="primary"
            @click="$router.push({ name: 'goal' })"
          >
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </v-fab-transition>
      </template>
      <div v-for="item in items" :key="item.title">
        <v-btn
          class="ml-2 d-none d-sm-flex text-capitalize font-weight-light"
          :to="item.to"
          text
          >{{ item.title }}</v-btn
        >
      </div>

      <v-btn icon class="ml-2" @click="changeTheme">
        <v-icon v-if="this.$vuetify.theme.dark">mdi-brightness-7</v-icon>
        <v-icon v-else>mdi-brightness-4</v-icon>
      </v-btn>
    </v-app-bar>

    <!-- MAIN CONTENT -->
    <v-content>
      <nuxt />
    </v-content>

    <!-- FOOTER -->
    <!-- <v-bottom-sheet v-model="sheet" class="text-center">
      <v-list>
        <v-subheader>Create new</v-subheader>
        <v-list-item
          v-for="tile in tiles"
          :key="tile.title"
          @click="sheet = false"
        >

          <v-list-item-avatar>
            <v-avatar size="32px" tile>
              <img
                :src="
                  `https://cdn.vuetifyjs.com/images/bottom-sheets/${tile.img}`
                "
                :alt="tile.title"
              />
            </v-avatar>
          </v-list-item-avatar>
          <v-list-item-title>{{ tile.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-bottom-sheet> -->

    <v-bottom-navigation
      app
      hide-on-scroll
      value="active.sync"
      grow
      color="primary"
      class="d-sm-none"
    >
      <v-btn to="/">
        <span>My Goals</span>
        <v-icon>mdi-target</v-icon>
      </v-btn>
      <v-btn to="/about">
        <span>About</span>
        <v-icon>mdi-information-outline</v-icon>
      </v-btn>
    </v-bottom-navigation>
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
      items: [
        {
          icon: 'mdi-target',
          title: 'My Goals',
          to: '/'
        },
        {
          icon: 'mdi-information-outline',
          title: 'About',
          to: '/about'
        }
      ],
      sheet: false,
      tiles: [
        { img: 'keep.png', title: 'Goal', to: 'goal' },
        { img: 'inbox.png', title: 'Inbox', to: 'index' }
      ]
    }
  },

  beforeMount() {
    // TODO: Refactor this
    localStorage.getItem('darkMode') === 'true'
      ? (this.$vuetify.theme.dark = true)
      : (this.$vuetify.theme.dark = false)
  },

  mounted() {
    this.hidden = false
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
  }
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
