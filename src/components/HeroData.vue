<template>
  <v-dialog v-model="dialog" persistent max-width="600px">
    <template v-slot:activator="{ on, attrs }">
      <v-btn dark v-bind="attrs" v-on="on" :text="btnFlat" :class="btnStyles">{{ btnName }}</v-btn>
    </template>
    <v-card>
      <v-card-title class="blue lighten-1">
        <span class="headline white--text">{{btnName}}</span>
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
                v-bind:value="name"
                v-on:input="$emit('input', $event.target.value)"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <v-text-field label="Year" maxlength="4" :rules="yearRules" v-model="year"></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field label="Info*" required :rules="infoRules" v-model="info"></v-text-field>
            </v-col>
          </v-row>
        </v-form>
        <small>*indicates required field</small>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
        <v-btn color="blue darken-1" text @click="validate">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "HeroData",
  props: {
    heroes: Array,
    btnName: String,
    btnStyles: String,
    btnFlat: Boolean,
    heroName: String,
    heroInfo: String,
    heroYear: Number
  },
  data: () => ({
    dialog: false,
    name: "",
    info: "",
    year: "",
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
  methods: {
    addHero() {
      this.dialog = false;

      const data = {};
      data["name"] = this.name;
      data["info"] = this.info;
      // optional fields
      if (this.year) {
        data["year"] = parseInt(this.year);
      }

      // NOTE: glitch (most likely API Problem)
      // using numbers in name and info field cause problems
      // try name = 1111, info = 1111, year = 1111

      let PORT = this.PORT ? this.PORT : 3000;
      fetch(`http://localhost:${PORT}/api/heroes/`, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      })
        .then(resp => {
          return resp.json();
        })
        .then(data => {
          this.heroes.push(data);
        })
        .catch(err => console.log(err));
    },
    validate() {
      if (this.$refs.form.validate()) {
        this.addHero();
        this.$refs.form.reset();
      }
    }
  }
};
</script>

<style>
</style>