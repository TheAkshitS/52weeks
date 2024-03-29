export const state = () => ({ goals: [], selectedGoal: {} })

export const mutations = {
  PREPARE_GOAL(state, goal) {
    const totalWeeks = 52
    const weeklyGoals = []
    let finalGoalAmount = 0

    for (let week = 1; week <= totalWeeks; week++) {
      finalGoalAmount = finalGoalAmount + goal.amount * week

      weeklyGoals.push({
        week,
        amountToBeDeposited: goal.amount * week,
        status: false,
      })
    }

    goal.finalGoalAmount = finalGoalAmount
    goal.weeklyGoals = weeklyGoals

    state.goals.push(goal)
  },

  SELECT_GOAL(state, goal) {
    state.selectedGoal = goal
  },

  UPDATE_GOAL(state, goal) {
    const goalId = (element) => element.id === goal.id
    const goalIndex = state.goals.findIndex(goalId)
    state.goals[goalIndex].name = goal.name
  },

  DELETE_GOAL(state, id) {
    state.goals = state.goals.filter((goal) => goal.id !== id)
  },

  UPDATE_SELECTED_GOAL(state, weeklyGoal) {
    state.selectedGoal.weeklyGoals = weeklyGoal
  },
}

export const actions = {
  createGoal({ commit }, goal) {
    commit('PREPARE_GOAL', goal)
  },
}
