<template lang="pug">
img.type-icon(v-if="type", :src="'/svg/' + type + '.svg'", alt="")
</template>

<script setup lang="ts">
import { defineProps } from "vue";

defineProps({
  type: {
    type: String,
    default: "skill",
  },
});
</script>

<style lang="stylus" scoped>
.type-icon
  width 2em
  height 2em
  color #999
</style>