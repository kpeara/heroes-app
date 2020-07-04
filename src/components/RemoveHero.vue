<template>
  <v-dialog v-model="dialog" persistent max-width="600px">
    <template v-slot:activator="{ on, attrs }">
      <v-btn dark text class="yellow--text text--darken-2" v-bind="attrs" v-on="on">Remove</v-btn>
    </template>
    <v-alert prominent class="blue lighten-4">
      <v-row align="center">
        <v-col
          class="font-weight-bold"
        >Are you sure you want to delete this hero? All data will be lost and cannot be recovered.</v-col>
        <v-col class="shrink">
          <v-btn class="mb-4 red">Remove</v-btn>
          <v-btn text @click="dialog=false">Cancel</v-btn>
        </v-col>
      </v-row>
    </v-alert>
  </v-dialog>
</template>

<script>
export default {
  name: "RemoveHero",
  props: {
    hero: Object
  },
  data: () => ({
    dialog: false
  })
};
</script>