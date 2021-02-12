<template lang="pug">
section
  .types
    type-icon.type(
      @click="$router.push(`/explore/${atype}`)",
      :class="{ active: atype == type }",
      v-for="atype in types",
      :key="atype",
      :type="atype",
      path="discs"
    )
  router-view(v-slot="{ Component }")
    transition(name="fade")
      component(:is="Component")
</template>

<script setup >
import { defineProps } from "vue";
import { model } from "store@model";
const props = defineProps({
  type: String,
});
const types = Object.keys(model);
</script>

<style lang="stylus" scoped>
main
  overflow-x: hidden

.types
  display: flex
  padding: 1em

.type
  font-size: 1.5em
  opacity: 0.2
  transition: all 300ms ease
  cursor: pointer
  padding: 4px

.type:hover
  opacity: 1

.type.active
  opacity: 0.8
</style>