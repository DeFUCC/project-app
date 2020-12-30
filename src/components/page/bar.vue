<template>
  <aside
    :style="{
      backgroundColor: itemColor(id),
    }"
    class="row"
  >
    <PageRoute :id="id" />
    <div class="spacer"></div>
    <span class="close" @click="$emit('close')">
      <span class="iconify" data-icon="la:times"></span>
    </span>
  </aside>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { itemColor } from "../../tools/colors";

export default defineComponent({
  emits: ["close"],
  props: {
    id: String,
  },
  setup() {
    return {
      itemColor,
    };
  },
});
</script>

<style scoped>
.row {
  display: flex;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 30;
  font-size: 14px;
  height: 32px;
}
.close {
  padding: 8px 16px;
  cursor: pointer;
}
</style>