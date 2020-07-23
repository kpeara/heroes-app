<template>
  <v-main class="mt-14">
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
        <v-col class="grow">{{ successMessage }}</v-col>
      </v-row>
    </v-alert>
    <v-card dark class="mx-auto elevation-12" max-width="500">
      <v-card-title class="purple--text text--lighten-2">
        <span class="headline">Login</span>
      </v-card-title>
      <v-card-text>
        <v-form ref="form">
          <v-row>
            <v-col cols="12">
              <v-text-field
                label="Username"
                counter
                maxlength="15"
                :rules="validationRules"
                required
                v-model="username"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                label="Password"
                type="password"
                :rules="validationRules"
                required
                v-model="password"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="purple lighten-2" text @click="login">Sign In</v-btn>
      </v-card-actions>
    </v-card>
  </v-main>
</template>

<script>
import { notifyMixin } from "../mixins/notifyMixin";

export default {
  name: "Login",
  mixins: [notifyMixin],
  data: () => ({
    PORT: 3002,
    username: "",
    password: "",
    validationRules: [(v) => v != "" || "Required"],
  }),
  methods: {
    login() {
      if (this.$refs.form.validate()) {
        // creating user object
        const user = {};
        user["username"] = this.username;
        user["password"] = this.password;

        // login user
        let PORT = this.PORT ? this.PORT : 3002;
        fetch(`http://localhost:${PORT}/api/user/login`, {
          method: "POST", // might change to POST for token creation
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        })
          .then((resp) => {
            if (resp.ok) {
              this.successNotify();
            } else {
              this.errorNotify(new Error("User Not Found"));
            }
          })
          .catch((err) => {
            console.log(err);
            this.errorNotify(new Error("Failed to Login"));
          });
        this.$refs.form.reset();
      }
    },
  },
};
</script>
