<template>
  <div>
    <v-dialog
      v-if="!$vuetify.breakpoint.xsOnly"
      v-model="showCreateWindow"
      width="500"
    >
      <v-card>
        <v-card-title class="headline mb-5"
          >Create a new new goal 🎯</v-card-title
        >
        <v-form
          ref="createGoalForm"
          lazy-validation
          @submit.prevent="createGoal"
        >
          <v-card-text>
            <v-text-field
              v-model="goal.name"
              :rules="goalNameRules"
              label="What is the name of your goal?"
              placeholder="Name"
              outlined
              required
              validate-on-blur
              autocomplete="off"
              append-icon="mdi-form-textbox"
            />
            <v-text-field
              v-model.number="goal.amount"
              :rules="goalAmountRules"
              label="How much do you want to save per week?"
              placeholder="Amount"
              type="number"
              min="0"
              pattern="[0-9]*"
              outlined
              required
              validate-on-blur
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
          </v-card-text>

          <v-card-actions>
            <v-spacer />

            <v-btn
              class="mx-3 mb-3"
              color="success"
              rounded
              type="submit"
              :disabled="disabledCreateGoal"
              >Create</v-btn
            >
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>

    <v-bottom-sheet v-else v-model="showCreateWindow">
      <v-list>
        <v-container>
          <h2 class="title">Create a new new goal 🎯</h2>
          <v-form
            ref="createGoalForm"
            lazy-validation
            @submit.prevent="createGoal"
          >
            <v-row>
              <v-col cols="12" md="4">
                <v-text-field
                  v-model="goal.name"
                  :rules="goalNameRules"
                  label="What is the name of your goal?"
                  placeholder="Name"
                  outlined
                  required
                  validate-on-blur
                  autocomplete="off"
                  append-icon="mdi-form-textbox"
                />
                <v-text-field
                  v-model.number="goal.amount"
                  :rules="goalAmountRules"
                  label="How much do you want to save per week?"
                  placeholder="Amount"
                  type="number"
                  min="0"
                  pattern="[0-9]*"
                  outlined
                  required
                  validate-on-blur
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
  </div>
</template>

<script>
export default {
  props: {
    sheet: {
      default: false,
      type: Boolean
    }
  },

  data() {
    return {
      goal: {
        id: Math.random()
          .toString(16)
          .slice(2),
        name: '',
        amount: '',
        startDate: new Date().toISOString().substring(0, 10)
      },
      goalNameRules: [(v) => !!v || 'Name is required'],

      goalAmountRules: [
        (v) => !!v || 'Amount is required',
        (v) => v >= 0 || 'Amount must be greater than 0'
      ],
      dateMenu: false
    }
  },

  computed: {
    showCreateWindow: {
      get() {
        return this.sheet
      },

      set() {
        this.$emit('update:sheet', false)
      }
    },
    disabledCreateGoal() {
      return [this.goal.name, this.goal.amount].includes('')
    }
  },

  methods: {
    async createGoal() {
      if (this.$refs.createGoalForm.validate()) {
        await this.$store.dispatch('goal/createGoal', this.goal)
        this.$emit('update:sheet', false)
        this.$store.dispatch('ui/setSnackbar', { text: 'Goal created ✔' })
        this.resetNewGoalForm()
      }
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
    }
  }
}
</script>
