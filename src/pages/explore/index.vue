<template lang="pug">
.explore
  .head Choose type in index
  .types
    .type(
      @click="$router.push(`/explore/${type}`)",
      v-for="type in types",
      :key="type"
    )
      header
        item-type(:type="type")
        .spacer
        .count {{ count(type) }}
      section
        .title {{ $tc(`type.${type}`, count(type)) }}
        .def {{ $t(`def.${type}`) }}
</template>

<script setup lang="ts">
import { types } from "../../store/model";
import { useTitle } from "@vueuse/core";
import { reactive } from "vue";
import { db } from "../../store/gun-db";

useTitle("Explore");

const counter = reactive({});

types.forEach((type) => {
  counter[type] = {};
  db.get(type)
    .map()
    .once((data, key) => {
      if (data) {
        counter[type][key] = data;
      }
    });
});

function count(type) {
  return Object.keys(counter[type]).length;
}
</script>

<style lang="stylus" scoped>
.title
  font-size 1.2em
  font-weight bold

.def
  padding 0.5em 0

.head
  padding 0.5em

.types
  display grid
  grid-gap 1em
  padding 1em
  grid-template-columns repeat(auto-fill, minmax(300px, 1fr))

header
  display flex
  flex 1
  width 100%

section
  padding 0.5em

.type
  font-size 1em
  opacity 0.8
  cursor pointer
  transition all 300ms ease
  display flex
  flex-flow column nowrap
  align-items flex-start
  background-color var(--top-bar)
  padding 1em

.type img
  font-size 1.4em
  height 2em

.type .count
  padding 8px
  font-size 1em
  white-space nowrap
  font-weight bold

.type:hover
  opacity 1

.type.active
  opacity 0.85
</style>