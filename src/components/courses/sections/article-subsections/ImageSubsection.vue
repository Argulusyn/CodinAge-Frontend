<template>
  <div
    class="image-subsection d-flex flex-column align-center justify-center fill-width"
  >
    <v-img
      v-if="subsection.source"
      max-height="200px"
      :src="subsection.source"
      :alt="subsection.caption"
    />
    <p v-if="subsection.caption">{{ subsection.caption }}</p>
  </div>
</template>

<script>
export default {
  name: "ImageSubsection",
  props: {
    subsection: {
      type: Object,
      required: true
    }
  }
};
</script>
