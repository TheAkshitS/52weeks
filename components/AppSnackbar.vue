<template>
  <v-snackbar
    :value="snackbar.visible"
    top
    color="primary"
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
    }
  }
}
</script>
