<template>
  <v-container class="article-section-edit-container mt-10">
    <v-text-field v-model="section.title" label="Title" solo />
    <v-textarea
      v-model="section.description"
      label="Description"
      rows="2"
      solo
    />

    <h2 class="title fill-width text-center mb-5">Subsections</h2>
    <div class="subsections">
      <component
        :is="getSubsectionComponentByType(subsection.type)"
        v-for="(subsection, index) in section.subsections"
        :value="subsection"
        :key="`${subsection.type}${index}`"
        @delete-subsection="deleteSubsectionByIndex(index)"
      />
    </div>
    <div class="add-subsection d-flex justify-center align-center fill-width">
      Add
      <v-btn text @click="addSubsection(articleSubsectionTypes.TEXT)">
        Paragraph
      </v-btn>
      or
      <v-btn text @click="addSubsection(articleSubsectionTypes.IMAGE)">
        Image
      </v-btn>
      subsection
    </div>
  </v-container>
</template>

<script>
import { get } from "lodash";

import ImageSubsectionEdit from "@/components/courses/sections/article-subsections/edit/ImageSubsectionEdit.vue";
import TextSubsectionEdit from "@/components/courses/sections/article-subsections/edit/TextSubsectionEdit.vue";

import { ARTICLE_SUBSECTIONS } from "@/constants/courses.js";

const DEFAULT_ARTICLE_SUBSECTION = {
  [ARTICLE_SUBSECTIONS.TEXT]: {
    content: ""
  },
  [ARTICLE_SUBSECTIONS.IMAGE]: {
    source: "",
    caption: ""
  }
};

const SUBSECTION_COMPONENTS = {
  [ARTICLE_SUBSECTIONS.TEXT]: "TextSubsectionEdit",
  [ARTICLE_SUBSECTIONS.IMAGE]: "ImageSubsectionEdit"
};

export default {
  name: "ArticleSectionEdit",
  components: { ImageSubsectionEdit, TextSubsectionEdit },
  props: {
    section: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      articleSubsectionTypes: { ...ARTICLE_SUBSECTIONS }
    };
  },
  computed: {
    subsections() {
      return get(this.section, "subsections", []);
    }
  },
  methods: {
    addSubsection(subsectionType) {
      this.section.subsections.push({
        ...DEFAULT_ARTICLE_SUBSECTION[subsectionType],
        type: subsectionType
      });
    },
    getSubsectionComponentByType(type) {
      return SUBSECTION_COMPONENTS[type];
    },
    deleteSubsectionByIndex(index) {
      this.section.subsections.splice(index, 1);
    }
  }
};
</script>

<style lang="scss" scoped>
.add-subsection {
  min-height: 100px;
  background: #fff;
  border: 1px dotted #1976d2;
  border-radius: 10px;
}
</style>
