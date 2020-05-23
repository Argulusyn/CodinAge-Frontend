<template>
  <v-container class="article-section-edit-container mt-10">
    <h2 class="title">{{ section.title }}</h2>
    <p>{{ section.description }}</p>

    <div class="subsections">
      <component
        :is="getSubsectionComponentByType(subsection.type)"
        v-for="(subsection, index) in section.subsections"
        :subsection="subsection"
        :key="`${subsection.type}${index}`"
      />
    </div>
  </v-container>
</template>

<script>
import { get } from "lodash";

import ImageSubsection from "@/components/courses/sections/article-subsections/ImageSubsection.vue";
import TextSubsection from "@/components/courses/sections/article-subsections/TextSubsection.vue";

import { ARTICLE_SUBSECTIONS } from "@/constants/courses.js";

const SUBSECTION_COMPONENTS = {
  [ARTICLE_SUBSECTIONS.TEXT]: "TextSubsection",
  [ARTICLE_SUBSECTIONS.IMAGE]: "ImageSubsection"
};

export default {
  name: "ArticleSection",
  components: { TextSubsection, ImageSubsection },
  props: {
    section: {
      type: Object,
      required: true
    }
  },
  computed: {
    subsections() {
      return get(this.section, "subsections", []);
    }
  },
  methods: {
    getSubsectionComponentByType(type) {
      return SUBSECTION_COMPONENTS[type];
    }
  }
};
</script>

<style lang="scss" scoped></style>
