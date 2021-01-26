<template lang="pug">
list-items(
  :wide="true",
  :key="type",
  :type="type",
  :editable="true",
  @open="$router.push(`/explore/${type}/${$event.id}`)"
)
</template>

<script setup lang="ts">
import { defineProps } from "vue";
import { useTitle } from "@vueuse/core";

const props = defineProps({
  type: String,
});
useTitle(`Explore ${props.type}`);

function explore(ev) {
  console.log(ev);
}
</script>

<style lang="stylus" scoped></style>