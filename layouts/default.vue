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
            @click="sheet = true"
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
      <!-- <v-btn icon @click="sheet = true">
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn> -->
    </v-app-bar>

    <!-- MAIN CONTENT -->
    <v-content>
      <nuxt />
    </v-content>

    <!-- FOOTER -->
    <v-bottom-sheet v-model="sheet">
      <v-list>
        <v-container>
          <h2 class="title">Create a new new goal 🎯</h2>
          <v-form>
            <v-row>
              <v-col cols="12" md="4">
                <v-text-field
                  v-model="goal.name"
                  label="What is the name of your goal?"
                  placeholder="Name"
                  outlined
                  required
                  append-icon="mdi-form-textbox"
                />
                <v-text-field
                  v-model.number="goal.amount"
                  label="How much do you want to save per week?"
                  placeholder="Amount"
                  type="number"
                  pattern="[0-9]*"
                  outlined
                  required
                  append-icon="mdi-cash"
                />
                <v-menu
                  v-model="menu2"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  transition="scale-transition"
                  offset-y
                  min-width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="goal.startDate"
                      label="When do you plan to start?"
                      placeholder="Start date"
                      outlined
                      required
                      append-icon="mdi-calendar-range"
                      readonly
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="goal.startDate"
                    @input="menu2 = false"
                  ></v-date-picker>
                </v-menu>
              </v-col>
            </v-row>
            <v-row>
              <v-spacer />
              <v-btn class="mx-3" color="primary" rounded @click="createGoal"
                >Create</v-btn
              >
            </v-row>
          </v-form>
        </v-container>
      </v-list>
    </v-bottom-sheet>

    <v-bottom-navigation
      app
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
      menu2: false,
      goal: {
        name: '',
        amount: '',
        startDate: ''
      },
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

  created() {
    this.$store.dispatch('goal/fetchGoals')
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
    async createGoal() {
      await this.$store.dispatch('goal/addGoal', this.goal)
      this.sheet = false
    },

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
