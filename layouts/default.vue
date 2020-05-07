<template>
  <v-app>
    <!-- APP BAR -->
    <v-app-bar fixed app flat>
      <v-toolbar-title>
        <v-icon left color="primary" @click="changeRoute">
          {{
            $route.name === 'index'
              ? 'mdi-cash-multiple'
              : 'mdi-keyboard-backspace'
          }}
        </v-icon>
        <n-link to="/" style="text-decoration: none;"
          >52 Weeks
          <span class="font-weight-medium">Money Challenge</span></n-link
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
            @click="openBottomSheet"
          >
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </v-fab-transition>
      </template>
      <div v-for="item in navItems" :key="item.title" class="mr-2">
        <v-btn
          class="ml-2 d-none d-sm-flex text-capitalize font-weight-light"
          :to="item.to"
          text
          >{{ item.title }}</v-btn
        >
      </div>
      <v-btn icon to="/settings"><v-icon>mdi-cog-outline</v-icon></v-btn>
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
          <v-form @submit.prevent="createGoal">
            <v-row>
              <v-col cols="12" md="4">
                <v-text-field
                  v-model="goal.name"
                  label="What is the name of your goal?"
                  placeholder="Name"
                  outlined
                  required
                  autocomplete="off"
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
                  autocomplete="off"
                  append-icon="mdi-cash"
                />
                <v-menu
                  v-model="dateMenu"
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
                    @input="dateMenu = false"
                  ></v-date-picker>
                </v-menu>
              </v-col>
            </v-row>
            <v-row class="mb-5">
              <v-spacer />
              <v-btn
                class="mx-3"
                color="success"
                rounded
                type="submit"
                :disabled="disabledCreateGoal"
                >Create</v-btn
              >
            </v-row>
          </v-form>
        </v-container>
      </v-list>
    </v-bottom-sheet>

    <app-bottom-nav :nav-items="navItems" />

    <app-snackbar />
  </v-app>
</template>

<script>
export default {
  components: {
    AppBottomNav: () => import('@/components/AppBottomNav'),
    AppSnackbar: () => import('@/components/AppSnackbar')
  },

  data() {
    return {
      title: '52 Weeks Money Challenge 💪',
      activeBtn: 1,
      drawer: false,
      hidden: true,
      dateMenu: false,
      goal: {
        id: Math.random()
          .toString(16)
          .slice(2),
        name: '',
        amount: '',
        startDate: new Date().toISOString().substring(0, 10)
      },
      requiredRules: [(v) => !!v || 'Name is required'],
      navItems: [
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
      sheet: false
    }
  },

  computed: {
    disabledCreateGoal() {
      return [this.goal.name, this.goal.amount].includes('')
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
    async createGoal() {
      await this.$store.dispatch('goal/createGoal', this.goal)
      this.sheet = false
      this.$store.dispatch('ui/setSnackbar', { text: 'Goal created 🎉' })
    },

    openBottomSheet() {
      this.resetNewGoalForm()
      this.sheet = true
    },

    resetNewGoalForm() {
      this.goal = {
        id: Math.random()
          .toString(16)
          .slice(2),
        name: '',
        amount: '',
        startDate: new Date().toISOString().substring(0, 10)
      }
    },

    changeRoute() {
      if (this.$route.name === 'index') this.$router.push('/')
      this.$router.go(-1)
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
