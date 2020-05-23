<template>
  <v-dialog v-model="showModal" persistent max-width="720px">
    <template v-slot:activator="{ on }">
      <slot name="activator" :on="on"></slot>
    </template>
    <v-card>
      <v-card-title class="d-flex justify-center">
        <h2 class="headline">New Course</h2>
      </v-card-title>
      <v-card-text>
        <v-container class="px-5">
          <v-form @submit.prevent="createNewCourse">
            <v-text-field
              v-model="courseName"
              type="text"
              placeholder="Course name"
              :rules="[rules.required]"
            />
            <v-textarea
              v-model="description"
              type="text"
              placeholder="Description"
            />
            <v-text-field
              v-model="subjects"
              type="text"
              placeholder="Subjects"
              hint="Enter subjects divided by comma"
            />
            <v-row class="mx-0 select-type-and-difficulty-row">
              <v-select
                v-model="type"
                label="Type"
                :items="typeSelectItems"
                :rules="[rules.required]"
              />
              <v-select
                v-model="difficulty"
                label="Difficulty"
                :items="difficultySelectItems"
                :rules="[rules.required]"
              />
            </v-row>
            <v-file-input
              v-model="previewImage"
              label="Preview image"
              prepend-icon="mdi-camera"
              clearable
            />

            <v-row class="mx-0 mt-8">
              <v-spacer />
              <v-btn class="mr-8" @click="closeModal">Close</v-btn>
              <v-btn type="submit">Add</v-btn>
            </v-row>
          </v-form>
        </v-container>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import { createCourse } from "@/api/courses.js";
import { VALIDATION_RULES } from "@/constants/common";

import {
  COURSE_DIFFICULTY,
  COURSE_DIFFICULTY_LABELS,
  COURSE_TYPE_LABELS,
  COURSE_TYPES
} from "@/constants/courses";
import { toBase64 } from "@/utils/common.js";

const TYPE_SELECT_ITEMS = Object.values(COURSE_TYPES).map(type => ({
  text: COURSE_TYPE_LABELS[type],
  value: type
}));

const DIFFICULTY_SELECT_ITEMS = Object.values(COURSE_DIFFICULTY).map(
  difficulty => ({
    text: COURSE_DIFFICULTY_LABELS[difficulty],
    value: difficulty
  })
);

const SUBJECTS_SPLITTER = ",";

export default {
  name: "NewCourseModal",
  data() {
    return {
      courseName: "",
      description: "",
      subjects: "",
      type: null,
      difficulty: null,
      previewImage: null,
      typeSelectItems: TYPE_SELECT_ITEMS,
      difficultySelectItems: DIFFICULTY_SELECT_ITEMS,
      showModal: false,
      rules: { ...VALIDATION_RULES }
    };
  },
  methods: {
    async createNewCourse() {
      const previewImage =
        this.previewImage && (await toBase64(this.previewImage));

      const subjects = this.subjects
        .split(SUBJECTS_SPLITTER)
        .map(subject => subject.trim());

      const { data: createCourseId } = await createCourse({
        name: this.courseName,
        description: this.description,
        subjects,
        courseType: this.type,
        difficultyLevel: this.difficulty,
        previewImage
      });

      await this.$router.push({
        name: "EditCourse",
        params: { courseId: createCourseId }
      });
    },
    closeModal() {
      this.showModal = false;
    }
  }
};
</script>

<style lang="scss" scoped>
.select-type-and-difficulty-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 40px;
}
</style>
