export const state = () => ({
  currencies: [
    { name: 'inr', icon: 'mdi-currency-inr', symbol: '₹' },
    { name: 'usd', icon: 'mdi-currency-usd', symbol: '$' },
    { name: 'eur', icon: 'mdi-currency-eur', symbol: '€' },
    { name: 'gbp', icon: 'mdi-currency-gbp', symbol: '£' },
  ],
  selectedCurrency: { name: 'inr', icon: 'mdi-currency-inr', symbol: '₹' },
})

export const mutations = {
  SET_CURRENCY(state, currency) {
    state.selectedCurrency = currency
  },
}
