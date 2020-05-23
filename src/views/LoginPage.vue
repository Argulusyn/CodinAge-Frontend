<template>
  <v-content class="login-page">
    <v-container class="d-flex align-center justify-center fill-height">
      <v-card class="login-card d-flex">
        <v-container
          class="login-form-container flex-grow-1 d-flex flex-column align-stretch justify-space-around"
        >
          <v-card-title class="justify-center" primary-title>
            CodinAge
          </v-card-title>
          <v-form class="d-flex flex-column align-stretch">
            <v-text-field
              v-model="login"
              :rules="[rules.required]"
              type="text"
              name="login-input"
              label="login"
            />
            <v-text-field
              v-model="password"
              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              :rules="[rules.required, rules.passwordLengthMin]"
              :type="showPassword ? 'text' : 'password'"
              name="password-input"
              label="password"
              hint="At least 8 characters"
              @click:append="showPassword = !showPassword"
            />
          </v-form>
          <v-card-actions class="justify-space-between px-0">
            <v-btn @click="redirectToSignUp" class="mr-12">Sign Up</v-btn>
            <v-btn type="submit" @click="onLoginClick">Login</v-btn>
          </v-card-actions>
        </v-container>
        <v-divider vertical></v-divider>
        <v-container class="flex-grow-1 d-flex align-center justify-center">
          <v-img
            src="@/assets/images/codinage-logo.png"
            alt="CodinAge Logo"
            max-width="300px"
          />
        </v-container>
      </v-card>
    </v-container>
  </v-content>
</template>

<script>
import { mapActions } from "vuex";

import { types } from "@/store/types";
import { VALIDATION_RULES } from "@/constants/common";

export default {
  name: "LoginPage",
  data() {
    return {
      login: "",
      password: "",
      rules: { ...VALIDATION_RULES },
      showPassword: false,
      error: ""
    };
  },
  methods: {
    ...mapActions({
      loginUser: types.actions.LOGIN
    }),
    async onLoginClick() {
      try {
        await this.loginUser({
          username: this.login,
          password: this.password
        });

        await this.$router.push({ name: "Courses" });
      } catch (error) {
        this.error = "Invalid username or password";
      }
    },
    redirectToSignUp() {
      this.$router.push({ name: "SignUp" });
    }
  }
};
</script>

<style lang="scss" scoped>
.login-page {
  background: url(~@/assets/images/paper-background.jpg) no-repeat;
  background-size: cover;
}

.login-form-container {
  padding-left: 12%;
  padding-right: 12%;
}

.login-card {
  min-width: 70%;
  min-height: 65%;
}
</style>
