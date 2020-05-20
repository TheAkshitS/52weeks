import Vue from 'vue'

export default ({ store }) => {
  Vue.filter('currency', function(value) {
    if (!value) return ''
    return store.state.settings.selectedCurrency.symbol + value
  })
}
