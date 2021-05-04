<template>
  <v-snackbar
    bottom
    :value="snackbar.visible"
    :color="snackbar.color"
    :timeout="snackbar.timeout"
  >
    {{ snackbar.text }}
  </v-snackbar>
</template>

<script>
export default {
  computed: {
    snackbar() {
      return this.$store.state.ui.snackbar
    },
  },
}
</script>
