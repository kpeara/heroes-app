<template>
  <v-dialog v-model="dialog" persistent max-width="600px">
    <template v-slot:activator="{ on, attrs }">
      <v-btn dark v-bind="attrs" v-on="on" class="py-6 red--text">Add Hero</v-btn>
    </template>
    <v-card>
      <v-card-title class="blue lighten-1">
        <span class="headline white--text">Add Hero</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12" sm="6" md="4">
              <v-text-field label="Hero Name*" required></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <v-text-field label="Year"></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field label="Info" required></v-text-field>
            </v-col>
          </v-row>
        </v-container>
        <small>*indicates required field</small>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
        <v-btn color="blue darken-1" text @click="addHero">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "HeroData",
  props: {
    heroes: null
  },
  data: () => ({
    dialog: false
  }),
  methods: {
    addHero() {
      this.dialog = false;
      const data = {
        name: "Black Panther",
        info: "King. Rich. Panther"
      };
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
    }
  }
};
</script>

<style>
</style>