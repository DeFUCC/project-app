<template lang="pug">
.orgs
  .org(v-for="org in orgs", :key="org")
    router-link(:to="`/explore/${org}`") {{ org }}
    .types
      type-card(
        @click="$router.push(`/explore/${type}`)",
        v-for="type in types",
        :key="type",
        :type="type",
        :parent="org"
      )
</template>

<script setup lang="ts">
import { types } from "../../store/model";
import { useTitle } from "@vueuse/core";

useTitle("Explore");

const orgs = ["feeds-app", "project-app"];
</script>

<style lang="stylus" scoped>
.types
  display grid
  grid-gap 1em
  padding 1em
  grid-template-columns repeat(auto-fill, minmax(300px, 1fr))
</style>