import goalDb from '~/database/goalDb'

export const state = () => ({ goals: [] })

export const getters = { goals: (state) => state.goals }

export const mutations = {
  ADD_GOAL(state, goal) {
    state.goals.push(goal)
  },

  SET_GOALS(state, goals) {
    state.goals = goals
  },

  CLEAR_GOALS(state) {
    state.goals = []
  },

  TOGGLE_GOAL(state, toggleGoal) {
    const goal = state.goals.find((goal) => goal.id === toggleGoal.id)
    if (goal) {
      goal.completed = toggleGoal.completed
    }
  }
}

export const actions = {
  async fetchGoals({ commit }) {
    commit('CLEAR_GOALS')
    const db = await goalDb.connect()
    db.getAll().then(
      (res) => {
        commit('SET_GOALS', res)
      },
      (err) => {
        throw err
      }
    )
  },

  async addGoal({ commit }, req) {
    const db = await goalDb.connect()
    db.add(req).then(
      (res) => {
        commit('ADD_GOAL', res)
      },
      (err) => {
        throw err
      }
    )
  },

  async toggleGoal({ commit }, req) {
    const db = await goalDb.connect()
    db.put(req).then(
      (res) => {
        commit('TOGGLR_GOAL', res)
      },
      (err) => {
        throw err
      }
    )
  }
}
