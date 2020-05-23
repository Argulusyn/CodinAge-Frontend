<template>
  <div class="text-subsection">
    <v-row class="fill-width justify-end">
      <v-btn icon @click="deleteSubsection">
        <v-icon color="grey lighten-1">mdi-delete</v-icon>
      </v-btn>
    </v-row>

    <v-textarea
      v-model="value.content"
      label="Content"
      rows="3"
      auto-grow
      solo
    />
  </div>
</template>

<script>
export default {
  name: "TextSubsectionEdit",
  props: {
    value: {
      type: Object,
      required: true
    }
  },
  methods: {
    deleteSubsection() {
      this.$emit("delete-subsection");
    }
  }
};
</script>
