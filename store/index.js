import Vuex from 'vuex'
import goalDb from '~/assets/goalDb'

export default () =>
  new Vuex.Store({
    state: {
      goals: []
    },

    getters: {
      goals: (state) => state.goals
    },

    mutations: {
      addGoal(state, goal) {
        state.goals.push(goal)
      },

      setGoals(state, goals) {
        state.goals = goals
      },

      clearGoals(state) {
        state.goals = []
      },

      toggleGoal(state, toggleGoal) {
        const goal = state.goals.find((goal) => goal.id === toggleGoal.id)
        if (goal) {
          goal.completed = toggleGoal.completed
        }
      }
    },

    actions: {
      async fetchGoals({ commit }) {
        commit('clearGoals')
        const db = await goalDb.connect()
        db.getAll().then(
          (res) => {
            commit('setGoals', res)
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
            commit('addGoal', res)
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
            commit('toggleGoal', res)
          },
          (err) => {
            throw err
          }
        )
      }
    }
  })
