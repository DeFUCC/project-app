<template lang="pug">
list-items(
  :wide="true",
  :key="type",
  :type="type",
  :editable="true",
  :org="org",
  @open="$router.push(`/org/${org}/${type}/${$event.id}`)"
)
</template>

<script setup lang="ts">
import { defineProps } from "vue";
import { useTitle } from "@vueuse/core";

const props = defineProps({
  type: String,
  org: String,
});
useTitle(`Explore ${props.type}`);

function explore(ev) {
  console.log(ev);
}
</script>

<style lang="stylus" scoped></style>