<template lang="pug">
.explore
  .head Choose type in index
  .types
    .type(
      @click="$router.push(`/explore/${type}`)",
      v-for="type in types",
      :key="type"
    )
      item-type(:type="type")
      .name {{ $tc(`type.${type}`, count(type)) }}
      .spacer
      .count {{ count(type) }}
</template>

<script setup lang="ts">
import { types } from "../../store/model";
import { useTitle } from "@vueuse/core";
import { reactive } from "vue";
import { db } from "../../store/gun-db";

const counter = reactive({});

types.forEach((type) => {
  counter[type] = {};
  db.get(type)
    .map()
    .once((data, key) => {
      if (data && data.title) {
        counter[type][key] = data;
      }
    });
});

function count(type) {
  return Object.keys(counter[type]).length;
}
</script>

<style lang="stylus" scoped>
.head
  padding 0.5em

.types
  display grid
  grid-gap 1em
  padding 1em
  grid-template-columns repeat(auto-fill, minmax(200px, 1fr))

.type
  font-size 1em
  opacity 0.8
  cursor pointer
  transition all 300ms ease
  display flex
  align-items center
  background-color var(--top-bar)
  padding 1em

.type img
  font-size 2em
  height 2em

.type .count
  padding 8px
  font-size 1.2em
  white-space nowrap
  font-weight bold

.type:hover
  opacity 1

.type.active
  opacity 0.85
</style>