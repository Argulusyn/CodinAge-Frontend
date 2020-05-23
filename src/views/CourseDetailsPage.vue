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
        <v-btn
          v-if="isCurrentLasSection"
          color="primary"
          @click="completeCourse"
        >
          Complete
        </v-btn>
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

import ArticleSection from "@/components/courses/sections/ArticleSection.vue";

import { getCourseById, updateCourse } from "@/api/courses";

import { COURSE_SECTION } from "@/constants/courses";

const SECTION_COMPONENTS = {
  [COURSE_SECTION.ARTICLE]: "ArticleSection"
};

export default {
  name: "EditDetailsPage",
  components: { ArticleSection },
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
    async completeCourse() {
      await updateCourse(this.course.id, this.course);
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
