<template>
  <div>date|time</div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";

export default defineComponent({
  props: {
    id: String,
    editable: Boolean,
  },
  setup(props) {
    const dates = reactive({
      start: null,
      finish: null,
    });
    return {};
  },
});
</script>

<style scoped>
</style>