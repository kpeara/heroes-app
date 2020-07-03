<template>
  <v-main class="mt-n10 mb-4">
    <v-row class="mb-2">
      <v-col class="ml-8">
        <HeroData :heroes="this.heroes" btnName="Add Hero" btnStyles="py-6 red--text" />
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
            <HeroData
              :heroes="null"
              btnName="Edit"
              :btnFlat="flatten"
              :name="hero.name"
              :year="hero.year"
              :info="hero.info"
            />
            <v-btn text>Remove</v-btn>
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
      //     info: "Nah nah nah..."
      //   },
    ],
    flatten: true
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
    //
  }
};
</script>