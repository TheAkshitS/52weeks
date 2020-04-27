export const state = () => ({ goals: [] })

export const getters = { goals: (state) => state.goals }

export const mutations = {
  CREATE_GOAL(state, goal) {
    state.goals.push(goal)
  },

  UPDATE_GOAL(state, goal) {
    const goalId = (element) => element.id === goal.id
    const goalIndex = state.goals.findIndex(goalId)

    state.goals[goalIndex].name = goal.name
  },

  DELETE_GOAL(state, id) {
    state.goals = state.goals.filter((goal) => goal.id !== id)
  }
}
