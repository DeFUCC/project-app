<template>
  <div class="filters">
    <button
      :class="{ active: options.orderBy.AB }"
      @click="$emit('order', 'AB')"
    >
      <span class="iconify" data-icon="la:sort-alpha-down"></span>
    </button>

    <button
      :class="{ active: options.orderBy.createdAt }"
      @click="$emit('order', 'createdAt')"
    >
      <span class="iconify" data-icon="la:sort-numeric-up-alt"></span>
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
.iconify {
  font-size: 2em;
}
.filters {
  display: flex;
}
</style>