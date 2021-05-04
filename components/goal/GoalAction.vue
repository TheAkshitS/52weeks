<template>
  <div>
    <v-dialog
      v-if="!$vuetify.breakpoint.xsOnly"
      v-model="goalActionWindowStatus"
      width="500"
    >
      <v-card>
        <v-card-title class="headline mb-5"
          ><span class="text-capitalize">{{ selectedAction }}</span
          >&nbsp;goal 🎯</v-card-title
        >
        <v-card-text>
          <v-text-field
            v-if="selectedAction === 'edit'"
            v-model="newGoalName"
            label="What is the name of
              your goal?"
            placeholder="Name"
            outlined
            required
            append-icon="mdi-form-textbox"
            @keyup.enter="goalOptionSubmit"
          />

          <div v-else>Are you sure, you want to delete this goal?</div>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn
            class="mx-3 mb-3"
            :color="selectedAction === 'edit' ? 'primary' : 'error'"
            :disabled="selectedAction === 'edit' && goal.name === newGoalName"
            rounded
            @click="goalOptionSubmit"
            >{{ selectedAction === 'edit' ? 'Ok' : 'Delete' }}</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-bottom-sheet v-else v-model="goalActionWindowStatus">
      <v-list>
        <v-container>
          <h2 class="title">
            <span class="text-capitalize">{{ selectedAction }}</span> goal 🎯
          </h2>

          <v-row class="mt-2">
            <v-col cols="12" md="4">
              <v-text-field
                v-if="selectedAction === 'edit'"
                v-model="newGoalName"
                label="What is the name of
              your goal?"
                placeholder="Name"
                outlined
                required
                append-icon="mdi-form-textbox"
                @keyup.enter="goalOptionSubmit"
              />

              <div v-else>Are you sure, you want to delete this goal?</div>
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
  </div>
</template>

<script>
export default {
  props: {
    showGoalActionWindow: {
      type: Boolean,
      default: false,
    },

    selectedAction: {
      type: String,
      default: null,
    },

    goal: {
      type: Object,
      default: null,
    },
  },

  data() {
    return {
      newGoalName: this.goal.name,
    }
  },

  computed: {
    goalActionWindowStatus: {
      get() {
        return this.showGoalActionWindow
      },

      set() {
        this.$emit('update:show-goal-action-window', false)
      },
    },
  },

  methods: {
    goalOptionSubmit() {
      this.$emit('update:show-goal-action-window', false)

      if (this.selectedAction === 'edit') {
        const newGoal = { ...this.goal }

        newGoal.name = this.newGoalName
        this.$store.commit('goal/UPDATE_GOAL', newGoal)
        this.$store.dispatch('ui/setSnackbar', { text: 'Goal updated 👌' })
      } else if (this.selectedAction === 'delete') {
        this.$store.commit('goal/DELETE_GOAL', this.$route.params.id)
        this.$store.dispatch('ui/setSnackbar', { text: 'Goal deleted ✔' })
        this.$router.push('/')
      }
    },
  },
}
</script>
