<template>
  <v-bottom-sheet v-model="goalActionWindowStatus">
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
                label="What is the name of
              your goal?"
                placeholder="Name"
                outlined
                required
                append-icon="mdi-form-textbox"
                @keyup.enter="goalOptionSubmit"
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
</template>

<script>
export default {
  props: {
    showGoalActionWindow: {
      type: Boolean,
      default: false
    },

    selectedAction: {
      type: String,
      default: null
    },

    goal: {
      type: Object,
      default: null
    }
  },

  data() {
    return {
      newGoalName: this.goal.name
    }
  },

  computed: {
    goalActionWindowStatus: {
      get() {
        return this.showGoalActionWindow
      },

      set() {
        this.$emit('update:show-goal-action-window', false)
      }
    }
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
    }
  }
}
</script>
