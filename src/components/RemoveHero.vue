<template>
  <v-dialog v-model="dialog" persistent max-width="600px">
    <template v-slot:activator="{ on, attrs }">
      <v-btn dark text class="pink--text text--darken-1" v-bind="attrs" v-on="on">Remove</v-btn>
    </template>
    <v-alert prominent primary class="red accent-2 white--text">
      <v-row align="center">
        <v-col
          class="font-weight-bold"
        >Are you sure you want to delete this hero? All data will be lost and cannot be recovered.</v-col>
        <v-col class="shrink">
          <v-btn text dark class="mb-4" @click="deleteHero(hero.id)">Remove</v-btn>
          <v-btn text dark @click="dialog=false">Cancel</v-btn>
        </v-col>
      </v-row>
    </v-alert>
  </v-dialog>
</template>

<script>
export default {
  name: "RemoveHero",
  props: {
    hero: Object,
    heroes: Array
  },
  data: () => ({
    dialog: false,
    newHeroes: null
  }),
  created() {
    this.newHeroes = this.heroes;
  },
  methods: {
    deleteHero(id) {
      this.dialog = false;

      let PORT = this.PORT ? this.PORT : 3000;
      fetch(`http://localhost:${PORT}/api/heroes/${id}`, {
        method: "DELETE",
        mode: "cors"
      })
        .then(resp => {
          return resp.json();
        })
        .then(data => {
          // delete from array
          this.newHeroes = this.newHeroes.filter(hero => {
            return hero.id !== data.id;
          });
          this.$emit("heroes", this.newHeroes);
        })
        .catch(err => console.log(err));
    }
  }
};
</script>