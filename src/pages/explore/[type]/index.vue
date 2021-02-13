<template lang="pug">
list-items(
  :wide="true",
  :key="type",
  :type="type",
  :editable="true",
  :collective="appPath",
  @open="$router.push(`/explore/${type}/${$event.id}`)"
)
</template>

<script setup >
import { defineProps } from "vue";
import { useTitle } from "@vueuse/core";
import { appPath } from "store@gun-db";

const props = defineProps({
  type: String,
});
useTitle(`Explore ${props.type}`);
</script>

<style lang="stylus" scoped></style>