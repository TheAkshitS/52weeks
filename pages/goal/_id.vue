<template>
  <v-container>
    <v-card color="primary" class="ma-2 px-3" dark>
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
            >{{ $store.getters['goal/goalAmount'](goal.id) | currency }}
            /
            {{
              $store.getters['goal/goalAmount'](goal.id) | currency
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
            :value="value"
            color="white"
            class="subtitle-2"
          >
            {{ value }}%
          </v-progress-circular>
        </v-avatar>
      </v-row>
    </v-card>

    <v-simple-table class="mx-2 mt-5">
      <template v-slot:default>
        <thead>
          <tr>
            <th>Deposited</th>
            <th>Week</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="week in 52" :key="week">
            <td><v-checkbox /></td>

            <td>
              Week {{ week }}<br /><v-icon left small class="ma"
                >mdi-calendar-range</v-icon
              >{{
                $dayjs(goal.startDate)
                  .add(week, 'week')
                  .format('DD/MM')
              }}
            </td>
            <td>
              <v-icon left class="ma-0">mdi-cash</v-icon>
              {{ (goal.amount * week) | currency }}
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>

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
                <tr v-for="week in 52" :key="week" class="text-center">
                  <td class="text-center">{{ week }}</td>
                  <td class="text-center">
                    {{ (goal.amount * week) | currency }}
                  </td>
                  <td class="text-center">
                    {{
                      $dayjs(goal.startDate)
                        .add(week, 'week')
                        .format('DD/MM/YY')
                    }}
                  </td>
                  <td class="text-center">No</td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-container>
      </v-card>
    </v-dialog>

    <v-bottom-sheet v-model="goalBottomSheet">
      <v-list>
        <v-container>
          <h2 class="title">
            <span class="text-capitalize">{{ selectedAction }}</span> goal 🎯
          </h2>

          <v-row>
            <v-col cols="12" md="4">
              <div v-if="selectedAction === 'edit'">
                <v-text-field
                  v-model="newGoalName"
                  label="What is the name of your goal?"
                  placeholder="Name"
                  outlined
                  required
                  append-icon="mdi-form-textbox"
                />
              </div>
              <div v-else-if="selectedAction === 'delete'">
                Are you sure, you want to delete this goal?
              </div>
            </v-col>
          </v-row>
          <v-row class="mb-5">
            <v-spacer />
            <v-btn
              class="mx-3"
              :color="selectedAction === 'edit' ? 'primary' : 'error'"
              :disabled="selectedAction === 'edit' && goal.name === newGoalName"
              rounded
              @click="goalOptionSubmit"
              >{{ selectedAction === 'edit' ? 'Ok' : 'Delete' }}</v-btn
            >
          </v-row>
        </v-container>
      </v-list>
    </v-bottom-sheet>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      goalBottomSheet: false,
      selectedAction: null,
      newGoalName: '',
      optionItems: [
        {
          icon: 'mdi-pencil-outline',
          title: 'edit'
        },
        {
          icon: 'mdi-trash-can-outline',
          title: 'delete'
        }
      ],
      tableTitles: ['Week', 'Save', 'Date', 'Deposited'],
      goalObjectiveDialog: false,
      value: 30
    }
  },

  computed: {
    goal() {
      return {
        ...this.$store.getters['goal/goals'].find(
          (goal) => goal.id === this.$route.params.id
        )
      }
    },

    remainingWeeks() {
      const totalWeekFromStartDate = this.$dayjs(this.goal.startDate).add(
        52,
        'week'
      )
      const passedWeeksFromNow = this.$dayjs(this.goal.startDate).add(1, 'week')

      return totalWeekFromStartDate.diff(passedWeeksFromNow, 'week')
    }
  },

  methods: {
    optionAction(optionTitle) {
      this.selectedAction = optionTitle
      this.newGoalName = this.goal.name
      this.goalBottomSheet = true
    },

    goalOptionSubmit() {
      this.goalBottomSheet = false

      if (this.selectedAction === 'edit') {
        const newGoal = { ...this.goal }

        newGoal.name = this.newGoalName
        this.$store.commit('goal/UPDATE_GOAL', newGoal)
        this.$store.dispatch('ui/setSnackbar', { text: 'Goal updated 👌' })
      } else if (this.selectedAction === 'delete') {
        this.$store.commit('goal/DELETE_GOAL', this.$route.params.id)
        this.$store.dispatch('ui/setSnackbar', { text: 'Goal deleted ⚰' })
        this.$router.push('/')
      }
    }
  },

  head() {
    return {
      title: `${this.goal.name}`
    }
  }
}
</script>
