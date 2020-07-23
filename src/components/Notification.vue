<template>
  <v-main>
    <v-alert
      dark
      border="bottom"
      colored-border
      elevation="2"
      type="error"
      class="mt-n14 mb-14"
      v-if="error"
    >
      <v-row class="text-center">
        <v-col class="grow">Error: {{ errorMessage }}. Please Try Again.</v-col>
      </v-row>
    </v-alert>
    <v-alert
      dark
      border="bottom"
      colored-border
      elevation="2"
      type="success"
      class="mt-n14 mb-14"
      v-if="success"
    >
      <v-row class="text-center">
        <v-col class="grow">Success: {{ successMessage }}</v-col>
      </v-row>
    </v-alert>
  </v-main>
</template>

<script>
export default {
  name: "Notification",
  props: {
    success: Boolean,
    error: Boolean,
    successMessage: String,
    errorMessage: String,
  },
};
</script>