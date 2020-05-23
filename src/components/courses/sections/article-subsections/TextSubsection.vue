<template>
  <div class="text-subsection">
    <p>{{ subsection.content }}</p>
  </div>
</template>

<script>
export default {
  name: "TextSubsection",
  props: {
    subsection: {
      type: Object,
      required: true
    }
  }
};
</script>
