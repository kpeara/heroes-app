<template>
  <v-main class="mt-n10">
    <v-row class="mb-2">
      <v-col class="ml-8">
        <!-- <v-btn class="red white--text" @click="addHero">Add Hero</v-btn> -->
        <HeroData />
      </v-col>
    </v-row>
    <v-row dense>
      <v-col v-for="(hero, i) in heroes" :key="i" cols="12">
        <v-card dark shaped class="mx-4">
          <v-card-title class="headline">{{hero.name}}</v-card-title>

          <v-card-subtitle class="my-n2">
            <div v-if="hero.year">{{"YEAR: " + hero.year}}</div>
            <div>{{"INFO: " + hero.info}}</div>
          </v-card-subtitle>

          <v-card-actions>
            <v-btn text>Edit</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-main>
</template>

<script>
import HeroData from "./HeroData";

export default {
  name: "Home",
  components: {
    HeroData
  },
  data: () => ({
    PORT: 3000,
    heroes: [
      // data of the form:
      //   {
      //     id: 1,
      //     name: "Batman",
      //     year: 1939,
      //     info:
      //       "Batman is a fictional superhero..."
      //   },
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
      .catch(err => console.log(err));
  },
  methods: {
    addHero() {
      const data = {
        name: "Wonder Woman",
        info:
          "Amazonian Warrior and memeber of Justice League. Brought to life by Zeus from clay. Alias: Diana Prince."
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