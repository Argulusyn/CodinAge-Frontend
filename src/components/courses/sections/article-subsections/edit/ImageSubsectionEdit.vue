<template>
  <div
    class="image-subsection d-flex flex-column align-center justify-center fill-width"
  >
    <v-row class="fill-width justify-end">
      <v-btn icon @click="deleteSubsection">
        <v-icon color="grey lighten-1">mdi-delete</v-icon>
      </v-btn>
    </v-row>
    <v-img
      v-if="value.source"
      max-height="200px"
      :src="value.source"
      :alt="value.caption"
    />
    <v-file-input
      v-if="!value.source"
      label="image"
      placeholder="image"
      prepend-icon="mdi-camera"
      solo
      @change="updateImage"
    />
    <v-text-field
      v-model="value.caption"
      label="Caption"
      class="image-subsection-caption fill-width"
      solo
    />
  </div>
</template>

<script>
import { toBase64 } from "@/utils/common.js";

export default {
  name: "ImageSubsectionEdit",
  props: {
    value: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      previewImage: null
    };
  },
  methods: {
    async updateImage(imageFile) {
      this.value.source = imageFile && (await toBase64(imageFile));
    },
    deleteSubsection() {
      this.$emit("delete-subsection");
    }
  }
};
</script>
