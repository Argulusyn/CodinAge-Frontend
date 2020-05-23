<template>
  <div class="fill-height">
    <v-navigation-drawer class="section-sidebar" permanent app width="400px">
      <v-container class="d-flex flex-column align-center fill-height">
        <h2 class="title my-3">Sections</h2>
        <v-divider class="fill-width" />
        <v-list v-if="hasCourseSections" shaped class="fill-width">
          <v-list-item
            v-for="(section, index) in courseSections"
            :key="section.title"
            class="fill-width"
            @click="selectSection(index)"
          >
            <v-list-item-content>{{ section.title }}</v-list-item-content>
          </v-list-item>
        </v-list>

        <v-spacer />
        <finish-course-modal
          v-if="isCurrentLasSection"
          @rate-course="completeCourse"
        >
          <template v-slot:activator="{ on }">
            <v-btn color="primary" v-on="on">
              Complete
            </v-btn>
          </template>
        </finish-course-modal>
      </v-container>
    </v-navigation-drawer>

    <v-content class="fill-height section-container pb-12">
      <h1 class="headline fill-width text-center mt-8">{{ course.name }}</h1>
      <component
        v-if="currentSectionComponent"
        class="course-section"
        :is="currentSectionComponent"
        :section="currentSection"
      />
    </v-content>
  </div>
</template>

<script>
import { get } from "lodash";
import { mapGetters } from "vuex";

import ArticleSection from "@/components/courses/sections/ArticleSection.vue";
import FinishCourseModal from "@/components/courses/FinishCourseModal.vue";

import { finishCourse, getCourseById } from "@/api/courses";

import { types } from "@/store/types.js";
import { COURSE_SECTION } from "@/constants/courses";

const SECTION_COMPONENTS = {
  [COURSE_SECTION.ARTICLE]: "ArticleSection"
};

export default {
  name: "EditDetailsPage",
  components: { FinishCourseModal, ArticleSection },
  props: {
    courseId: {
      type: [String, Number],
      required: true
    }
  },
  data() {
    return {
      courseData: null,
      currentSectionIndex: 0
    };
  },
  computed: {
    ...mapGetters({
      userId: types.getters.USER_ID
    }),
    course() {
      return this.courseData || {};
    },
    courseSections() {
      return this.course.sections || [];
    },
    hasCourseSections() {
      return this.courseSections.length > 0;
    },
    courseType() {
      return this.course.courseType;
    },
    currentSection() {
      return get(this.courseSections, this.currentSectionIndex);
    },
    currentSectionComponent() {
      const currentSectionType = get(this.currentSection, "type", null);
      return SECTION_COMPONENTS[currentSectionType];
    },
    isCurrentLasSection() {
      return this.currentSectionIndex === this.courseSections.length - 1;
    }
  },
  async mounted() {
    const { data: course } = await getCourseById(this.courseId);
    this.courseData = course;
  },
  methods: {
    selectSection(index) {
      this.currentSectionIndex = index;
    },
    async completeCourse(rating) {
      await finishCourse(this.course.id, {
        userId: this.userId,
        rating
      });

      await this.$router.push({ name: "Courses" });
    }
  }
};
</script>

<style lang="scss" scoped>
.section-sidebar {
  background: rgba(194, 223, 242, 0.27);
}

.section-container {
  background: rgba(225, 231, 235, 0.27) 100%;
}

.course-section {
  width: 50%;
}
</style>
