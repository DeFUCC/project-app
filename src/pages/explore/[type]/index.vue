<template lang="pug">
items-lister(
  :key="type",
  :type="type",
  :editable="true",
  @open="$router.push(`/explore/${$event.type}/${$event.id}`)"
)
</template>

<script setup lang="ts">
import { defineProps } from "vue";

const props = defineProps({
  type: String,
});

function explore(ev) {
  console.log(ev);
}
</script>

<style lang="stylus" scoped></style>