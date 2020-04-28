<template>
  <v-snackbar
    :value="snackbar.visible"
    top
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
    }
  }
}
</script>
