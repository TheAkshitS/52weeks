import Vue from 'vue'

export default ({ store }) => {
  Vue.filter('currency', function(value) {
    return store.state.settings.selectedCurrency.symbol + value
  })
}
