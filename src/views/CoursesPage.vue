<template>
  <v-content>
    <v-toolbar dense>
      <v-btn text>Profile</v-btn>
      <v-btn v-if="isAdministrator" text>Users</v-btn>
      <v-btn v-if="isAdministrator" text>Moderators</v-btn>
      <v-btn @click="logout" text>Logout</v-btn>
    </v-toolbar>
    <v-container>
      <h1 class="headline text-center mt-5">Courses List</h1>
      <div v-if="canAddNewCourse" class="d-flex">
        <v-spacer />
        <new-course-modal>
          <template v-slot:activator="{ on }">
            <v-btn v-on="on">Add new</v-btn>
          </template>
        </new-course-modal>
      </div>
      <v-container class="courses-container px-0">
        <course-card
          v-for="course in courses"
          :key="course.id"
          class="cursor-pointer"
          :course="course"
          :display-delete-button="isAdministrator"
          @open-course="openCourse"
          @delete-course="deleteCourse"
        />
      </v-container>
    </v-container>
  </v-content>
</template>

<script>
import { mapGetters } from "vuex";

import CourseCard from "@/components/courses/CourseCard.vue";
import NewCourseModal from "@/components/courses/NewCourseModal.vue";

import { types } from "@/store/types.js";
import { deleteCourseById, getCourses } from "@/api/courses.js";
import { USER_ROLES } from "@/constants/common.js";

export default {
  name: "CoursesPage",
  components: { CourseCard, NewCourseModal },
  data() {
    return {
      courses: [],
      page: 0,
      pageOffset: 20
    };
  },
  computed: {
    ...mapGetters({
      userRole: types.getters.USER_ROLE
    }),
    canAddNewCourse() {
      return this.userRole === USER_ROLES.MODERATOR || this.isAdministrator;
    },
    isAdministrator() {
      return this.userRole === USER_ROLES.ADMINISTRATOR;
    }
  },
  mounted() {
    this.loadCourses();
  },
  methods: {
    async loadCourses() {
      const { data: courses } = await getCourses();
      this.courses = courses;
    },
    openCourse(courseId) {
      this.$router.push({ name: "CourseDetails", params: { courseId } });
    },
    async deleteCourse(courseId) {
      await deleteCourseById(courseId);
      await this.loadCourses();
    },
    logout() {
      localStorage.clear();
      this.$router.go();
    }
  }
};
</script>

<style lang="scss" scoped>
.courses-container {
  display: grid;
  max-width: 100%;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr);
  grid-gap: 20px;
}
</style>
