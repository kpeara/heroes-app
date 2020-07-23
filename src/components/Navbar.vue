<template>
  <v-app-bar app dark>
    <v-toolbar-title>Heroes App</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn text fab class="red--text text--accent-2">
      <v-icon>mdi-exit-to-app</v-icon>
    </v-btn>
    <v-btn text fab class="light-blue--text text--accent-2">
      <v-icon>mdi-account-circle</v-icon>
    </v-btn>
    <v-btn
      href="https://github.com/kpeara"
      target="_blank"
      text
      fab
      class="teal--text text--accent-2"
    >
      <v-icon>mdi-github</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script>
export default {
  name: "Navbar",
};
</script>