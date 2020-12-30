<template>
  <article>
    {{ $route.path }} --
    {{ all }}
  </article>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: ["all"],
  setup() {
    return {};
  },
});
</script>

<style scoped>
</style>