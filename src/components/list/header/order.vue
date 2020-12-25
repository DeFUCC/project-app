<template>
  <div class="order">
    <button
      v-show="by == 'AB' || open"
      :class="{ active: by == 'AB' }"
      @click="
        $emit('order', 'AB');
        open = !open;
      "
    >
      <span class="iconify" data-icon="la:sort-alpha-down"></span>
    </button>

    <button
      v-show="by == 'createdAt' || open"
      :class="{ active: by == 'createdAt' }"
      @click="
        $emit('order', 'createdAt');
        open = !open;
      "
    >
      <span class="iconify" data-icon="la:sort-numeric-up-alt"></span>
    </button>

    <button
      v-show="by == 'rating' || open"
      :class="{ active: by == 'rating' }"
      @click="
        $emit('order', 'rating');
        open = !open;
      "
    >
      <span class="iconify" data-icon="la:sort-amount-up-solid"></span>
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  emits: ["order"],
  props: {
    by: {
      type: String,
      required: true,
    },
  },
  setup() {
    const open = ref(false);
    return {
      open,
    };
  },
});
</script>

<style scoped>
.order {
  border: 1px solid #555;
  border-radius: 2em;
  padding: 4px 0;
  transition: all 300ms ease-in-out;
}
.iconify {
  font-size: 1.4em;
}
button {
  transition: all 300ms ease-in-out;
}
</style>