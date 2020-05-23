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
            <v-list-item-action>
              <v-btn icon @click="deleteSection(index)">
                <v-icon color="grey lighten-1">mdi-delete</v-icon>
              </v-btn>
            </v-list-item-action>
          </v-list-item>
        </v-list>

        <v-menu offset-y>
          <template v-slot:activator="{ on }">
            <v-btn class="mt-5" color="primary" dark v-on="on">
              Add section
            </v-btn>
          </template>
          <v-list>
            <v-list-item
              v-for="({ text, value }, index) in addSectionMenuItems"
              :key="index"
              class="cursor-pointer"
              @click="createSection(value)"
            >
              <v-list-item-content>{{ text }}</v-list-item-content>
            </v-list-item>
          </v-list>
        </v-menu>

        <v-spacer />
        <v-btn color="primary" @click="saveChanges">Save changes</v-btn>
      </v-container>
    </v-navigation-drawer>

    <v-content class="fill-height edit-section-container pb-12">
      <h1 class="headline fill-width text-center mt-8">{{ course.name }}</h1>
      <component
        v-if="editSectionComponent"
        class="section-edit"
        :is="editSectionComponent"
        :section="editSection"
      />
    </v-content>
  </div>
</template>

<script>
import { get, first, cloneDeep } from "lodash";

import ArticleSectionEdit from "@/components/courses/sections/edit/ArticleSectionEdit.vue";

import { getCourseById, updateCourse } from "@/api/courses";

import {
  COURSE_SECTION,
  COURSE_SECTION_LABELS,
  COURSE_TYPES
} from "@/constants/courses";

const DEFAULT_SECTION_FIELDS = {
  [COURSE_SECTION.ARTICLE]: {
    subsections: []
  },
  [COURSE_SECTION.VIDEO]: {
    source: null
  },
  [COURSE_SECTION.QUESTION]: {
    options: [],
    correctOption: null
  }
};

const SECTION_TYPES_BASED_ON_COURSE_TYPE = {
  [COURSE_TYPES.ARTICLE]: [COURSE_SECTION.ARTICLE, COURSE_SECTION.QUESTION],
  [COURSE_TYPES.VIDEO]: [COURSE_SECTION.VIDEO, COURSE_SECTION.QUESTION],
  [COURSE_TYPES.MIXED]: Object.values(COURSE_SECTION)
};

const EDIT_SECTION_COMPONENTS = {
  [COURSE_SECTION.ARTICLE]: "ArticleSectionEdit"
};

export default {
  name: "EditCoursePage",
  components: { ArticleSectionEdit },
  props: {
    courseId: {
      type: [String, Number],
      required: true
    }
  },
  data() {
    return {
      courseData: null,
      addSectionMenuItems: [],
      editSectionIndex: null
    };
  },
  computed: {
    course() {
      return this.courseData || {};
    },
    courseSections: {
      get: function() {
        return this.course.sections || [];
      },
      set: function(sections) {
        this.course.sections = sections;
      }
    },
    hasCourseSections() {
      return this.courseSections.length > 0;
    },
    courseType() {
      return this.course.courseType;
    },
    editSection() {
      return get(this.courseSections, this.editSectionIndex);
    },
    editSectionComponent() {
      const editSectionType = get(this.editSection, "type", null);
      return EDIT_SECTION_COMPONENTS[editSectionType];
    }
  },
  async mounted() {
    const { data: course } = await getCourseById(this.courseId);
    this.courseData = course;

    const sectionTypes = SECTION_TYPES_BASED_ON_COURSE_TYPE[this.courseType];
    this.addSectionMenuItems = sectionTypes.map(sectionType => ({
      value: sectionType,
      text: COURSE_SECTION_LABELS[sectionType]
    }));
  },
  methods: {
    createSection(type) {
      const newSection = {
        ...cloneDeep(DEFAULT_SECTION_FIELDS[type]),
        title: "Default",
        description: "",
        type
      };

      this.courseSections.push(newSection);
      this.editSectionIndex = this.courseSections.findIndex(
        element => element === newSection
      );
    },
    deleteSection(sectionIndex) {
      this.courseSections = this.courseSections.filter(
        (element, index) => index !== sectionIndex
      );

      this.editSectionIndex = first(this.courseSections) ? 0 : null;
    },
    selectSection(index) {
      this.editSectionIndex = index;
    },
    async saveChanges() {
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

.edit-section-container {
  background: rgba(225, 231, 235, 0.27) 100%;
}

.section-edit {
  width: 50%;
}
</style>
