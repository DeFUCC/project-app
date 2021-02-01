<template lang="pug">
list-items(
  :wide="true",
  :key="type",
  :type="type",
  :editable="true",
  :collective="collective",
  @open="$router.push(`/c/${collective}/${type}/${$event.id}`)"
)
</template>

<script setup >
import { defineProps } from "vue";
import { useTitle } from "@vueuse/core";

const props = defineProps({
  type: String,
  collective: String,
});
useTitle(`Explore ${props.type}`);

function explore(ev) {
  console.log(ev);
}
</script>

<style lang="stylus" scoped></style>