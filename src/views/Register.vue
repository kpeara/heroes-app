<template>
  <v-main>
    <Notification
      :success="success"
      :error="error"
      :successMessage="successMessage"
      :errorMessage="errorMessage"
    />
    <v-card dark class="mx-auto elevation-12" max-width="500">
      <v-card-title class="teal--text text--accent-1">
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
        <v-btn color="teal accent-1" text @click="register">Sign Up</v-btn>
      </v-card-actions>
    </v-card>
  </v-main>
</template>

<script>
import { notifyMixin } from "../mixins/notifyMixin";
import Notification from "../components/Notification";

export default {
  name: "Register",
  mixins: [notifyMixin],
  components: { Notification },
  data: () => ({
    PORT: 3002,
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
              // this.successNotify("Redirecting to Login.");
              this.$router.replace({ name: "Login" });
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
  },
};
</script>
