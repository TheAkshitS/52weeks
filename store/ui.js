export const state = () => ({
  snackbar: {},
})

export const mutations = {
  SET_SNACKBAR(state, snackbar) {
    state.snackbar = snackbar
  },

  RESET_SNACKBAR(state) {
    state.snackbar.visible = false
  },
}

export const actions = {
  setSnackbar({ commit }, snackbar) {
    snackbar.visible = true
    snackbar.timeout = 1800
    snackbar.color = snackbar.color || 'success'

    setTimeout(function () {
      commit('RESET_SNACKBAR')
    }, 1800)

    commit('SET_SNACKBAR', snackbar)
  },
}
