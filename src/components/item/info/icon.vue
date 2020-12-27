<template>
  <div v-if="icon || editable" class="icon" :class="{ editable }">
    <img v-if="icon" :src="icon" />
    <div @click="$emit('edit')" class="plus" v-if="!icon || editable">
      <span class="iconify" data-icon="la:camera"></span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  emits: ["edit"],
  props: {
    icon: String,
    editable: Boolean,
  },
  setup() {
    return {};
  },
});
</script>

<style scoped>
.icon img {
  border-radius: 5em;
  transition: all 300ms ease;
}
.icon {
  position: relative;
  margin: 1em;
  border-radius: 5em;
  background-color: #eee;
  display: flex;
  align-items: center;
  justify-content: center;
}
.icon.editable {
  cursor: pointer;
}
.icon.editable:hover img {
  opacity: 0.3;
}
.plus {
  position: absolute;
  opacity: 0.5;
  padding: 0.5em;
  font-size: 1.5em;
  transition: all 300ms ease-in-out;
}
.icon:hover .plus {
  opacity: 1;
}
</style>