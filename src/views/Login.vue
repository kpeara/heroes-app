<template>
  <v-main class>
    <Notification
      :success="success"
      :error="error"
      :successMessage="successMessage"
      :errorMessage="errorMessage"
    />
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
          <router-link :to="{name: 'Register'}">Not an existing user? Register here!</router-link>
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
import Notification from "../components/Notification";

export default {
  name: "Login",
  mixins: [notifyMixin],
  components: { Notification },
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
            // if (resp.ok) {
            // this.successNotify("Authenticated!");
            return resp.json();
            // } else {
            //   this.errorNotify(new Error("User Not Found")); // shouldn't tell user about who exists
            // }
          })
          .then((data) => {
            console.log(data);
            // store using vueex
            this.$router.replace({ name: "Home" });
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
