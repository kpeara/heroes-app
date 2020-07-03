<template>
  <v-dialog v-model="dialog" persistent max-width="600px">
    <template v-slot:activator="{ on, attrs }">
      <v-btn dark v-bind="attrs" v-on="on" text>Edit</v-btn>
    </template>
    <v-card>
      <v-card-title class="blue lighten-1">
        <span class="headline white--text">{{hero.name}}</span>
      </v-card-title>
      <v-card-text>
        <v-form ref="form">
          <v-row>
            <v-col cols="12" sm="6" md="4">
              <v-text-field
                label="Hero Name*"
                :rules="nameRules"
                counter
                maxlength="30"
                required
                v-model="oldHero.name"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <v-text-field label="Year" maxlength="4" :rules="yearRules" v-model="oldHero.year"></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field label="Info*" required :rules="infoRules" v-model="oldHero.info"></v-text-field>
            </v-col>
          </v-row>
        </v-form>
        <small>*indicates required field</small>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="reset">Close</v-btn>
        <v-btn color="blue darken-1" text>Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "EditHero",
  props: {
    hero: Object
  },
  data: () => ({
    dialog: false,
    oldHero: null,
    nameRules: [
      v => (v && v.length <= 30) || "Max 30 characters",
      v => (v && v.length >= 3) || "Min 3 characters"
    ],
    infoRules: [
      v => (v && v.length <= 200) || "Max 200 characters",
      v => (v && v.length >= 3) || "Min 5 characters"
    ],
    yearRules: [
      v => !v || v.length == 4 || "Valid year",
      v =>
        !v ||
        (parseInt(v) && parseInt(v) <= new Date().getUTCFullYear()) ||
        "Valid year"
    ]
  }),
  created() {
    this.oldHero = { ...this.hero };
  },
  methods: {
    reset() {
      this.dialog = false;
      // resetting values
      this.oldHero.name = this.hero.name;
      this.oldHero.year = this.hero.year;
      this.oldHero.info = this.hero.info;
    }
  }
};
</script>

<style>
</style>