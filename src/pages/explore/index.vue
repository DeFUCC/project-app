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
import { types } from "../../store/model";
import { useTitle } from "@vueuse/core";

useTitle("Explore");
</script>

<style lang="stylus" scoped>
.types
  display grid
  grid-gap 1em
  padding 1em
  grid-template-columns repeat(auto-fill, minmax(300px, 1fr))
</style>