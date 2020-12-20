<template>
  <div class="filters">
    <button
      v-for="(by, key) in options.orderBy"
      :key="key"
      :class="{ active: by }"
      @click="$emit('order', key)"
    >
      {{ key }}
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  emits: ["order"],
  props: {
    options: {
      type: Object,
      required: true,
    },
  },
  setup() {
    return {};
  },
});
</script>

<style scoped>
.filters {
  display: flex;
}
</style>