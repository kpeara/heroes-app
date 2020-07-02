<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-toolbar-title>Heroes App</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn href="https://github.com/kpeara" target="_blank" text fab>
        <v-icon>mdi-github</v-icon>
      </v-btn>
    </v-app-bar>
    <v-content>
      <Home />
    </v-content>
  </v-app>
</template>

<script>
import Home from "./components/Home";

export default {
  name: "App",

  components: {
    Home
  },

  data: () => ({
    //
  })
};
</script>
