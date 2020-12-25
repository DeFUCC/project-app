<template>
  <div class="filter">
    <button :class="{ active: my.star }" @click="$emit('star')">
      <span class="iconify" data-icon="la:star"></span>
    </button>

    <button :class="{ active: my.seen }" @click="$emit('seen')">
      <span class="iconify" data-icon="la:eye"></span>
    </button>

    <button :class="{ active: my.trash }" @click="$emit('trash')">
      <span class="iconify" data-icon="la:trash"></span>
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  emits: ["star", "seen", "trash"],
  props: {
    my: {
      type: Object,
      default: {
        star: true,
        seen: true,
        trash: false,
      },
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