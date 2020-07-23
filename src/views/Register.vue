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
        <v-col class="grow">Success! Redirecting to Login.</v-col>
      </v-row>
    </v-alert>
    <v-card class="mx-auto elevation-12" max-width="500">
      <v-card-title class="blue--text text--darken-1">
        <span class="headline">Register</span>
      </v-card-title>
      <v-card-text>
        <v-form ref="form">
          <v-row>
            <v-col cols="12">
              <v-text-field
                label="Username"
                :rules="usernameRules"
                counter
                maxlength="15"
                required
                v-model="username"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                label="Password"
                type="password"
                :rules="passwordRules"
                required
                v-model="password"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-2" text @click="register">Sign Up</v-btn>
      </v-card-actions>
    </v-card>
  </v-main>
</template>

<script>
export default {
  name: "Register",
  data: () => ({
    PORT: 3002,
    error: false,
    success: false,
    errorMessage: "",
    username: "",
    password: "",
    // validation rules
    usernameRules: [
      (v) => (v && v.length >= 3) || "Min 3 characters",
      (v) => (v && v.length <= 15) || "Max 15 characters",
    ],
    passwordRules: [(v) => (v && v.length >= 5) || "Min 5 characters"],
  }),
  methods: {
    register() {
      if (this.$refs.form.validate()) {
        // creating user object
        const user = {};
        user["username"] = this.username;
        user["password"] = this.password; // HASH THIS

        // register user
        let PORT = this.PORT ? this.PORT : 3002;
        fetch(`http://localhost:${PORT}/api/user/register`, {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        })
          .then((resp) => {
            // if good response, redirect user to login page
            if (resp.ok) {
              console.log("User Registered");
              this.successNotify();
            } else {
              console.log("An error occurred.");
              this.errorNotify(new Error("Username Already Exists")); // send custom error when username is not unique
            }
          })
          .catch((err) => {
            console.log(err);
            this.errorNotify(new Error("Failed to Register User"));
          });

        this.$refs.form.reset();
      }
    },
    errorNotify(err) {
      this.errorMessage = err.message;
      this.error = true;
      setTimeout(() => (this.error = false), 5000);
    },
    successNotify() {
      this.success = true;
      setTimeout(() => (this.success = false), 3000);
    },
  },
};
</script>
