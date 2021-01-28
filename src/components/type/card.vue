<template lang="pug">
.type(v-if="count > 0 || isMine(parent)")
  header
    type-icon(:type="type")
    .spacer
    .count {{ count }}
  section
    .title {{ $tc(`type.${type}`, count) }}
    .def {{ $t(`def.${type}`) }}
</template>

<script setup lang="ts">
import { computed, defineProps, ref, watchEffect } from "vue";

const props = defineProps({
  type: String,
  parent: String,
});

import { types } from "../../store/model";
import { reactive } from "vue";
import { appPath, db, gun, soul } from "../../store/gun-db";
import { isMine } from "../../store/user";

const counter = ref({});

let query;
watchEffect(() => {
  if (props.parent) {
    query = gun.get(props.parent);
  } else {
    query = db;
  }
  counter.value = {};
  query
    .get(props.type)
    .map()
    .once((data, key) => {
      if (data) {
        counter.value[key] = data;
      }
    });
});

const count = computed(() => {
  return Object.keys(counter.value).length;
});
</script>

<style lang="stylus" scoped>
.title
  font-size 1.2em
  font-weight bold

.def
  padding 0.5em 0

.head
  padding 0.5em

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