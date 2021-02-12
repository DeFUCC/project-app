<template lang="pug">
img.type-icon(:src="`/svg/${path}/${type}.svg`", alt="")
</template>

<script setup >
import { defineProps } from "vue";
import { model } from "store@model";

defineProps({
  type: {
    type: String,
    default: "skill",
  },
  path: {
    type: String,
    default: "gray",
  },
});
</script>

<style lang="stylus" scoped>
.type-icon
  width: 2em
  height: 2em
  color: #999
</style>