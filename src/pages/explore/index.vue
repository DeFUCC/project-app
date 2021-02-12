<template lang="pug">
.types
  type-card(
    @click="$router.push(`/explore/${type}`)",
    v-for="type in types",
    :key="type",
    :type="type"
  )
</template>

<script setup >
import { types } from "store@model";
import { useTitle } from "@vueuse/core";

useTitle("Explore");
</script>

<style lang="stylus" scoped>
.types
  display: flex
  flex-flow: row wrap
  align-items: stretch
  justify-content: stretch
</style>