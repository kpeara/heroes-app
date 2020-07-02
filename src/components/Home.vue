<template>
  <v-content>
    <v-row dense>
      <v-col cols="12">
        <v-card dark shaped class="mx-4">
          <v-card-title class="headline">{{test}}</v-card-title>

          <v-card-subtitle>Listen to your favorite artists and albums whenever and wherever, online and offline.</v-card-subtitle>

          <v-card-actions>
            <v-btn text>Edit</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-content>
</template>

<script>
export default {
  name: "Home",
  data: () => ({
    test: 77
  })
};
</script>