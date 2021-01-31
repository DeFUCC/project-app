<template lang="pug">
.avatar
  img.avatar(v-if="pic", :src="pic", :class="{ [size]: true }")
</template>

<script setup >
import { defineProps } from "vue";

const props = defineProps({
  pic: String,
  pub: String,
  size: {
    type: String,
    default: "small",
  },
});
</script>

<style lang="stylus" scoped>
.avatar
  border-radius 8em

.small
  width 1.5em
  height 1.5em

.medium
  width 4em
  height 4em

.big
  width 8em
  height 8em

.large
  width 10em
</style>