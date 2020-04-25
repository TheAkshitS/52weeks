<template>
  <v-container>
    <h2 class="title">Create a new new goal 🎯</h2>
    <v-form>
      <v-row>
        <v-col cols="12" md="4">
          <v-text-field
            v-model="goal.name"
            autofocus
            label="What is the name of your goal?"
            placeholder="Name"
            outlined
            required
          />
          <v-text-field
            v-model.number="goal.amount"
            label="How much do you want to save per week?"
            placeholder="Amount"
            type="number"
            outlined
            required
          />
          <v-text-field
            v-model="goal.startDate"
            label="When do you plan to start?"
            placeholder="Start date"
            outlined
            required
          />
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
</template>

<script>
export default {
  data() {
    return {
      goal: {
        name: '',
        amount: '',
        startDate: ''
      }
    }
  },

  methods: {
    async createGoal() {}
  },

  head() {
    return {
      title: 'Create Goal',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Create a new 52weeks money challenge goal'
        }
      ]
    }
  }
}
</script>
