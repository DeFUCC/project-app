<template lang="pug">
img(:src="createAvatar(pub)", :width="size", :height="size")
</template>

<script setup lang="ts">
import { computed, defineProps, onMounted, ref } from "vue";
import createAvatar from "../../use/avatar";

const props = defineProps({
  pub: String,
  size: {
    type: Number,
    default: 420,
  },
});
</script>

<style lang="stylus" scoped>
img
  border-radius 100%
</style>