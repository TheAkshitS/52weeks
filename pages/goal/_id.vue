<template>
  <v-container>
    <v-row>
      <v-col
        ><h2 class="heading">🎯 {{ goal.name }}</h2></v-col
      >
      <v-col class="text-right">
        <v-menu bottom left>
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
    <p>{{ goal }}</p>
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
              color="primary"
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
      ]
    }
  },

  computed: {
    goal() {
      return {
        ...this.$store.getters['goal/goals'].find(
          (goal) => goal.id === this.$route.params.id
        )
      }
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
