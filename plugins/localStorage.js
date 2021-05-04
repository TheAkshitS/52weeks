import createPersistedState from 'vuex-persistedstate'

export default ({ store }) => {
  window.onNuxtReady(() => {
    createPersistedState({
      reducer: (persistedState) => {
        const stateFilter = Object.assign({}, persistedState)
        const blackList = ['ui']
        // For removing particular Vuex module from being persisted
        blackList.forEach((item) => {
          delete stateFilter[item]
        })

        return stateFilter
      },
    })(store)
  })
}
