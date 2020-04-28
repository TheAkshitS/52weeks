export const state = () => ({
  snackbar: {}
})

export const mutations = {
  SET_SNACKBAR(state, snackbar) {
    state.snackbar = snackbar
  }
}

export const actions = {
  setSnackbar({ commit }, snackbar) {
    snackbar.visible = true
    snackbar.timeout = 1800
    snackbar.color = snackbar.color || 'success'

    // TODO: Check visible
    setTimeout(function() {
      snackbar.visible = false
      commit('SET_SNACKBAR', snackbar)
    }, 1800)

    commit('SET_SNACKBAR', snackbar)
  }
}
