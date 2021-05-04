<template>
  <v-bottom-navigation
    app
    value="active.sync"
    grow
    color="primary"
    class="d-sm-none"
  >
    <v-btn v-for="item in navItems" :key="item.name" :to="item.to" nuxt>
      <span>{{ item.title }}</span>
      <v-icon>{{ item.icon }}</v-icon>
    </v-btn>
  </v-bottom-navigation>
</template>

<script>
export default {
  props: {
    navItems: {
      type: Array,
      required: true,
    },
  },
}
</script>
