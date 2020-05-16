<template>
  <v-content>
    <v-container class="d-flex align-center justify-center fill-height">
      <v-card class="sign-up-card d-flex">
        <v-container
          class="sign-up-form-container flex-grow-1 d-flex flex-column align-stretch justify-space-around"
        >
          <v-card-title class="justify-center" primary-title>
            Sign Up
          </v-card-title>
          <v-form class="d-flex flex-column align-stretch">
            <v-text-field
              v-model="login"
              :rules="[rules.required, rules.loginLengthMin]"
              type="text"
              name="login-input"
              label="login"
              hint="At least 3 characters"
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
            <v-text-field
              v-model="email"
              :rules="[rules.required, rules.email]"
              type="email"
              name="email-input"
              label="email"
            />
            <v-text-field
              v-model="firstName"
              :rules="[rules.required]"
              type="text"
              name="first-name-input"
              label="first name"
            />
            <v-text-field
              v-model="lastName"
              :rules="[rules.required]"
              type="text"
              name="last-name-input"
              label="last name"
            />
          </v-form>
          <v-card-actions class="mr-auto px-0">
            <v-btn @click="onSignUpClick">Sign Up</v-btn>
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
import { registerUser } from "@/api/authentication";

import { VALIDATION_RULES } from "@/constants/common";

export default {
  name: "SignUpPage",
  data() {
    return {
      login: "",
      password: "",
      email: "",
      firstName: "",
      lastName: "",
      showPassword: false,
      rules: { ...VALIDATION_RULES }
    };
  },
  methods: {
    onSignUpClick() {
      registerUser({
        username: this.login,
        password: this.password,
        email: this.email,
        firstName: this.firstName,
        lastName: this.lastName
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.sign-up-form-container {
  padding-left: 12%;
  padding-right: 12%;
}

.sign-up-card {
  min-width: 70%;
  min-height: 60%;
}
</style>
