<template lang="pug">
.types
  type-icon.type(
    @click="$emit('choose', type)",
    :class="{ active: active == type }",
    v-for="type in types",
    :key="type",
    :type="type"
  )
</template>

<script setup >
import { defineEmit, defineProps } from "vue";
import { types } from "../../store/model";

const emit = defineEmit(["choose"]);

const props = defineProps({
  active: String,
});
</script>

<style lang="stylus" scoped>
.types
  display flex
  overflow-x scroll

.type
  font-size 1.5em
  opacity 0.2
  transition all 300ms ease
  cursor pointer

.type:hover
  opacity 1

.type.active
  opacity 0.8
</style>