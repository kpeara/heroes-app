<template>
  <v-main class="mt-n10 mb-4">
    <v-alert dark border="bottom" colored-border elevation="2" type="error" v-if="error">
      <v-row class="text-center">
        <v-col class="grow">Error: {{ errorMessage }}. Please Try Again.</v-col>
      </v-row>
    </v-alert>
    <v-row class="mb-2">
      <v-col class="ml-8">
        <AddHero
          @hero-emitted="addHero($event)"
          :nameRules="nameRules"
          :yearRules="yearRules"
          :infoRules="infoRules"
        />
        <v-btn dark class="ml-4 py-6 purple--text text--accent-1" @click="reverseOrder">ASC/DESC</v-btn>
      </v-col>
    </v-row>
    <v-row dense>
      <v-col v-for="(hero, i) in heroes" :key="i" cols="12">
        <v-card dark shaped class="mx-4">
          <v-card-title class="headline ml-1">{{hero.name}}</v-card-title>

          <v-card-subtitle class="my-n2 ml-2">
            <div v-if="hero.year">
              <span class="font-weight-bold">YEAR:</span>
              {{hero.year}}
            </div>
            <div>
              <span class="font-weight-bold">INFO:</span>
              {{hero.info}}
            </div>
          </v-card-subtitle>

          <v-card-actions>
            <EditHero
              @hero-emitted="updateHero($event)"
              :hero="hero"
              :nameRules="nameRules"
              :yearRules="yearRules"
              :infoRules="infoRules"
            />
            <RemoveHero @hero-emitted="deleteHero($event)" :hero="hero" />
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-main>
</template>

<script>
import AddHero from "./AddHero";
import EditHero from "./EditHero";
import RemoveHero from "./RemoveHero";

export default {
  name: "Home",
  components: {
    AddHero,
    EditHero,
    RemoveHero
  },
  data: () => ({
    PORT: 3000,
    error: false,
    errorMessage: "Unknown",
    reversed: false,
    heroes: [
      /*
      data of the form:
        {
          id: 1,
          name: "Batman",
          year: 1939,
          info:
            "Nah nah nah"
        },
      */
    ],
    // form validation rules
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
        (parseInt(v) &&
          parseInt(v) <= new Date().getUTCFullYear() &&
          parseInt(v) > 0) ||
        "Valid year"
    ]
  }),
  created() {
    let PORT = this.PORT ? this.PORT : 3000;
    fetch(`http://localhost:${PORT}/api/heroes?`, { mode: "cors" })
      .then(res => {
        return res.json();
      })
      .then(data => {
        this.heroes = data;
      })
      .catch(err => this.errorNotify(err, "Failed to Retrieve Heroes"));
  },
  methods: {
    addHero(data) {
      // POST request
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
          if (!this.reversed) this.heroes.push(data);
          else {
            this.heroes.reverse();
            this.heroes.push(data);
            this.heroes.reverse();
          }
        })
        .catch(err => this.errorNotify(err, "Failed to Add Hero"));
    },
    updateHero(hero) {
      // create payload
      const data = {};
      data["name"] = hero.name;
      data["info"] = hero.info;
      // optional fields
      if (hero.year) {
        data["year"] = parseInt(hero.year);
      }

      // PUT Request
      let PORT = this.PORT ? this.PORT : 3000;
      fetch(`http://localhost:${PORT}/api/heroes/${hero.id}`, {
        method: "PUT",
        mode: "cors",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      }).catch(err => this.errorNotify(err, "Failed to Update Hero"));
    },
    deleteHero(id) {
      // DELETE request
      let PORT = this.PORT ? this.PORT : 3000;
      fetch(`http://localhost:${PORT}/api/heroes/${id}`, {
        method: "DELETE",
        mode: "cors"
      })
        .then(() => {
          this.heroes = this.heroes.filter(hero => {
            return hero.id !== id;
          });
        })
        .catch(err => this.errorNotify(err, "Failed to Remove Hero"));
    },
    reverseOrder() {
      this.heroes.reverse();
      this.reversed = !this.reversed;
    },
    errorNotify(err, message = "") {
      console.error(err);
      this.errorMessage = message;
      this.error = true;
      setTimeout(() => (this.error = false), 5000);
    }
  }
};
</script>