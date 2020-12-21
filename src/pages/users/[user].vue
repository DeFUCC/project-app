<template>
  {{ user }}
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    user: {
      type: Object,
      default: {
        pub: 0,
      },
    },
  },
  setup() {
    return {};
  },
});
</script>

<style scoped>
</style>