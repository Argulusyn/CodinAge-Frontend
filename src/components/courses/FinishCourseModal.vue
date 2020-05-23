<template>
  <v-dialog v-model="showModal" max-width="300px">
    <template v-slot:activator="{ on }">
      <slot name="activator" :on="on"></slot>
    </template>
    <div class="d-flex flex-column align-center white pb-5">
      <h2 class="title text-center">Congratulations!</h2>
      <p class="body-1 text-center">Please review the course:</p>
      <v-rating color="orange" hover @input="rateCourse" />
    </div>
  </v-dialog>
</template>

<script>
export default {
  name: "FinishCourseModal",
  data() {
    return {
      showModal: false
    };
  },
  methods: {
    rateCourse(rating) {
      this.$emit("rate-course", rating);
    }
  }
};
</script>
