<template>
  <img v-if="type" class="type-icon" :src="'/svg/' + type + '.svg'" alt="" />
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    type: {
      type: String,
      default: "skill",
    },
  },
  setup() {
    return {};
  },
});
</script>

<style scoped>
.type-icon {
  width: 1.5em;
}
</style>