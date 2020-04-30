export const state = () => ({
  currencies: [
    { name: 'inr', icon: 'mdi-currency-inr' },
    { name: 'usd', icon: 'mdi-currency-usd' },
    { name: 'eur', icon: 'mdi-currency-eur' },
    { name: 'gbp', icon: 'mdi-currency-gbp' }
  ],
  selectedCurrency: 'inr'
})

export const mutations = {
  SET_CURRENCY(state, currency) {
    state.selectedCurrency = currency
  }
}
