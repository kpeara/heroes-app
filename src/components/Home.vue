<template>
  <v-content>
    <v-row dense>
      <v-col v-for="(hero, i) in heroes" :key="i" cols="12">
        <v-card dark shaped class="mx-4">
          <v-card-title class="headline">{{hero.name}}</v-card-title>

          <v-card-subtitle>{{hero.info}}</v-card-subtitle>

          <v-card-actions>
            <v-btn text>Edit</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="d-flex justify-center">
        <v-btn class="red lighten-1 red--text text--lighten-4">Add Hero</v-btn>
      </v-col>
    </v-row>
  </v-content>
</template>

<script>
export default {
  name: "Home",
  data: () => ({
    heroes: [
      {
        id: 1,
        name: "Batman",
        year: 1939,
        info:
          "Batman is a fictional superhero appearing in American comic books published by DC Comics. The character was created by artist Bob Kane and writer Bill Finger, and first appeared in Detective Comics #27 in 1939. Originally named the 'Bat-Man,' the character is also referred to by such epithets as the Caped Crusader, the Dark Knight, and the World's Greatest Detective. (wikipedia)"
      },
      {
        id: 2,
        name: "Owlman",
        year: 2000,
        info:
          "Owlman is a fictional superhero appearing in American comic books published by DC Comics. The character was created by artist Bob Kane and writer Bill Finger (was he???), and first appeared in Detective Comics #27 in 1939. Originally named the 'Bat-Man,' the character is also referred to by such epithets as the Caped Crusader, the Dark Knight, and the World's Greatest Detective. (wikipedia)"
      }
    ]
  })
};
</script>