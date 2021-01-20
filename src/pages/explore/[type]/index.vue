<template lang="pug">
items-list(
  :key="type",
  :type="type",
  :editable="true",
  @explore="$router.push(`/explore/${type}/${$event.id}`)"
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