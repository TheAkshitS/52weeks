<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card color="primary" class="mx-2 px-3" dark>
          <v-row>
            <v-col
              ><h2 class="heading">🎯 {{ goal.name }}</h2></v-col
            >
            <v-col class="text-right">
              <v-btn icon @click="goalObjectiveDialog = true">
                <v-icon>mdi-finance</v-icon>
              </v-btn>
              <v-menu bottom>
                <template v-slot:activator="{ on }">
                  <v-btn icon v-on="on">
                    <v-icon>mdi-dots-vertical</v-icon>
                  </v-btn>
                </template>

                <v-list>
                  <v-list-item
                    v-for="item in optionItems"
                    :key="item.title"
                    class="text-capitalize"
                    @click="optionAction(item.title)"
                  >
                    <v-list-item-title
                      ><v-icon left small>{{ item.icon }}</v-icon>
                      {{ item.title }}</v-list-item-title
                    >
                  </v-list-item>
                </v-list>
              </v-menu>
            </v-col>
          </v-row>

          <v-row class="d-flex flex-no-wrap justify-space-between align-center">
            <div>
              <v-card-title class="title"
                >{{ totalAmountDeposited | currency }}
                /
                {{
                  goal.finalGoalAmount.toLocaleString() | currency
                }}</v-card-title
              >

              <v-card-subtitle
                >{{ remainingWeeks }} weeks remaining</v-card-subtitle
              >
            </div>
            <v-avatar class="" size="125" tile>
              <v-progress-circular
                rotate="360"
                size="75"
                width="8"
                :value="totalGoalProgress"
                color="white"
                class="subtitle-2"
              >
                {{ totalGoalProgress }}%
              </v-progress-circular>
            </v-avatar>
          </v-row>
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <v-simple-table class="mx-2">
          <template v-slot:default>
            <thead>
              <tr>
                <th>Deposited</th>
                <th>Week</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="weeklyGoal in weeklyGoals" :key="weeklyGoal.week">
                <td>
                  <v-checkbox
                    v-model="weeklyGoal.status"
                    @change="calculateValues"
                  />
                </td>

                <td>
                  Week {{ weeklyGoal.week }}<br /><v-icon left small
                    >mdi-calendar-range</v-icon
                  >{{
                    $dayjs(goal.startDate)
                      .add(weeklyGoal.week, 'week')
                      .format('DD/MM')
                  }}
                </td>
                <td>
                  <v-icon left class="ma-0">mdi-cash</v-icon>
                  {{ weeklyGoal.amountToBeDeposited | currency }}
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-col>
    </v-row>

    <v-dialog
      v-model="goalObjectiveDialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <v-card>
        <v-toolbar dark color="primary">
          <v-toolbar-title>🎯 Objective Details</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn icon dark @click="goalObjectiveDialog = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-container>
          <v-simple-table>
            <template v-slot:default>
              <thead>
                <tr>
                  <th
                    v-for="tableTitle in tableTitles"
                    :key="tableTitle"
                    class="text-center"
                  >
                    {{ tableTitle }}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="weeklyGoal in weeklyGoals"
                  :key="weeklyGoal.week"
                  class="text-center"
                >
                  <td class="text-center">{{ weeklyGoal.week }}</td>
                  <td class="text-center">
                    {{ weeklyGoal.amountToBeDeposited | currency }}
                  </td>
                  <td class="text-center">
                    {{
                      $dayjs(goal.startDate)
                        .add(weeklyGoal.week, 'week')
                        .format('DD/MM/YY')
                    }}
                  </td>
                  <td class="text-center">
                    {{ weeklyGoal.status ? 'Yes' : 'No' }}
                  </td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-container>
      </v-card>
    </v-dialog>

    <goal-action
      :show-goal-action-window.sync="showGoalActionWindow"
      :selected-action="selectedAction"
      :goal="goal"
    />
  </v-container>
</template>

<script>
export default {
  components: {
    GoalAction: () => import('@/components/goal/GoalAction'),
  },

  data() {
    return {
      showGoalActionWindow: false,
      selectedAction: null,
      optionItems: [
        {
          icon: 'mdi-pencil-outline',
          title: 'edit',
        },
        {
          icon: 'mdi-trash-can-outline',
          title: 'delete',
        },
      ],
      tableTitles: ['Week', 'Save', 'Date', 'Deposited'],
      goalObjectiveDialog: false,
      totalGoalProgress: 0,
      totalAmountDeposited: 0,
      remainingWeeks: 52,
    }
  },

  computed: {
    goal() {
      return this.$store.state.goal.selectedGoal
    },

    weeklyGoals: {
      get() {
        return this.goal.weeklyGoals
      },

      set() {
        this.$store.commit('goal/UPDATE_SELECTED_GOAL', this.weeklyGoals)
      },
    },
  },

  watch: {
    weeklyGoals: {
      immediate: true,
      deep: true,

      handler() {
        this.calculateValues()
      },
    },

    remainingWeeks(to) {
      if (to % 4 === 0)
        this.$store.dispatch('ui/setSnackbar', {
          text: `Congratutaions! ${this.totalGoalProgress}% goal completed 🥂`,
          timeout: 2500,
        })
    },
  },

  methods: {
    optionAction(optionTitle) {
      this.selectedAction = optionTitle
      this.showGoalActionWindow = true
    },

    calculateValues() {
      let weeklyGoalCompleted = 0
      let amountDeposited = 0

      this.weeklyGoals.forEach((goal) => {
        if (goal.status) {
          weeklyGoalCompleted++
          amountDeposited = amountDeposited + goal.amountToBeDeposited
        }
      })
      this.totalAmountDeposited = amountDeposited
      this.totalGoalProgress = Math.floor((weeklyGoalCompleted / 52) * 100)
      this.remainingWeeks = 52 - weeklyGoalCompleted
    },
  },

  head() {
    return {
      title: `${this.goal.name}` || '',
    }
  },
}
</script>
