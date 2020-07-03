<template>
  <v-dialog v-model="dialog" persistent max-width="600px">
    <template v-slot:activator="{ on, attrs }">
      <v-btn dark text class="yellow--text text--darken-2" v-bind="attrs" v-on="on">Edit</v-btn>
    </template>
    <v-card>
      <v-card-title class="yellow darken-3">
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
                v-model="newHero.name"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <v-text-field label="Year" maxlength="4" :rules="yearRules" v-model="newHero.year"></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field label="Info*" required :rules="infoRules" v-model="newHero.info"></v-text-field>
            </v-col>
          </v-row>
        </v-form>
        <small>*indicates required field</small>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="reset">Close</v-btn>
        <v-btn color="blue darken-1" text @click="updateHero">Save</v-btn>
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
    newHero: null,
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
    this.newHero = { ...this.hero };
  },
  methods: {
    updateHero() {
      this.dialog = false;
      // updating new value
      this.hero.name = this.newHero.name;
      this.hero.year = this.newHero.year;
      this.hero.info = this.newHero.info;

      // Data
      const data = {};
      data["name"] = this.hero.name;
      data["info"] = this.hero.info;
      // optional fields
      if (this.year) {
        data["year"] = parseInt(this.hero.year);
      }

      // PUT Request
      let PORT = this.PORT ? this.PORT : 3000;
      fetch(`http://localhost:${PORT}/api/heroes/${this.hero.id}`, {
        method: "PUT",
        mode: "cors",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      }).catch(err => console.log(err));
    },
    reset() {
      this.dialog = false;
      // resetting values
      this.newHero.name = this.hero.name;
      this.newHero.year = this.hero.year;
      this.newHero.info = this.hero.info;
    }
  }
};
</script>

<style>
</style>