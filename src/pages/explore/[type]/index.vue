<template lang="pug">
items-list(
  :key="type",
  :type="type",
  @open="feeds.open($event, -1)",
  :editable="true"
)
</template>

<script setup lang="ts">
import { defineProps } from "vue";

const props = defineProps({
  type: String,
});
</script>

<style lang="stylus" scoped></style>