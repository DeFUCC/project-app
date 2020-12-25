<template>
  <div class="filter">
    <button :class="{ active: by == 'AB' }" @click="$emit('order', 'AB')">
      <span class="iconify" data-icon="la:sort-alpha-down"></span>
    </button>

    <button
      :class="{ active: by == 'createdAt' }"
      @click="$emit('order', 'createdAt')"
    >
      <span class="iconify" data-icon="la:sort-numeric-up-alt"></span>
    </button>

    <button
      :class="{ active: by == 'rating' }"
      @click="$emit('order', 'rating')"
    >
      <span class="iconify" data-icon="la:star"></span>
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  emits: ["order"],
  props: {
    by: {
      type: String,
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
  font-size: 1.4em;
}
</style>