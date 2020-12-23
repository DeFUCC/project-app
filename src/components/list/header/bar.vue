<template>
  <header class="bar">
    <div class="title">
      <img
        v-if="type"
        class="icon bigger"
        :src="'/svg/' + type + '.svg'"
        alt=""
      />
      <span class="tag">{{ count }}</span>
    </div>
    <slot></slot>
    <button :disabled="!canAdd" @click="$emit('create')">
      <span class="iconify" data-icon="la:plus-circle"></span>
    </button>

    <div class="spacer"></div>
    <ListHeaderSearch @search="$emit('search', $event)" />
  </header>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  emits: ["search", "create"],
  props: {
    canAdd: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      default: "design",
    },
    count: {
      type: Number,
      default: 0,
    },
  },
  setup() {
    return {};
  },
});
</script>

<style scoped>
.bar {
  display: flex;
  overflow-x: scroll;
  position: sticky;
  z-index: 20;
  top: 0;
  flex-flow: row nowrap;
  align-items: stretch;
  justify-content: flex-start;
  padding: 1em;
  background-color: var(--bar-color);
}

.bar > .title {
  padding: 0 1em 0 0;
  font-size: 1.2em;
  font-weight: bold;
  display: flex;
  align-items: center;
}
</style>