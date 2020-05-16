<template>
  <v-content>
    <v-toolbar dense>
      <v-btn text>Profile</v-btn>
      <v-btn text>Users</v-btn>
      <v-btn text>Moderators</v-btn>
      <v-btn text>Logout</v-btn>
    </v-toolbar>
  </v-content>
</template>

<script>
export default {
  name: "CoursesPage",
  data() {
    return {
      courses: [],
      page: 0,
      pageOffset: 20
    };
  }
};
</script>

<style lang="scss" scoped></style>
