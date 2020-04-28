<template>
  <v-bottom-navigation
    app
    value="active.sync"
    grow
    color="primary"
    class="d-sm-none"
  >
    <v-btn to="/">
      <span>My Goals</span>
      <v-icon>mdi-target</v-icon>
    </v-btn>
    <v-btn to="/about">
      <span>About</span>
      <v-icon>mdi-information-outline</v-icon>
    </v-btn>
  </v-bottom-navigation>
</template>
