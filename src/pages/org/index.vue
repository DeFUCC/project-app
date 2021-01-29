<template lang="pug">
main#main
  .title Organisations
  .types(v-for="(org, path) in organisations", :key="org")
    router-link.title(:to="`/org/${path}`") {{ org.title }}
    type-counter(
      @click="$router.push(`/org/${path}/${type}`)",
      v-for="type in Object.keys(org.model)",
      :key="type",
      :type="type",
      :parent="path"
    )
  form.custom(@submit.prevent.stop)
    input(type="text", v-model="customOrg")
    router-link(:to="`/org/${customOrg}`") {{ customOrg }}
</template>

<script setup lang="ts">
import { organisations, types } from "../../store/model";
import { useTitle } from "@vueuse/core";
import { ref } from "vue";

useTitle("Organisations");

const customOrg = ref("");
</script>

<style lang="stylus" scoped>
.title
  padding 0.5em 1em

.types
  display grid
  grid-gap 1em
  padding 1em
  grid-template-columns repeat(auto-fill, minmax(200px, 1fr))
  margin-bottom 2em
  padding-bottom 2em
  border-bottom 1px solid #333
</style>