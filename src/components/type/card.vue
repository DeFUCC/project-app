<template lang="pug">
.type
  type-icon.bg(:type="type", path="color-lines")
  header
    .title {{ $tc(`type.${type}`, count) }}
    .spacer
    .count {{ count }}
  section
    .def {{ $t(`def.${type}`) }}
</template>

<script setup >
import { computed, defineProps, ref, watchEffect } from "vue";
import { appPath, gun } from "../../store/gun-db";

const props = defineProps({
  type: String,
  parent: String,
});

const counter = ref({});

let query;

if (props.parent) {
  query = gun.get(props.parent);
} else {
  query = gun.get(appPath);
}
counter.value = {};
query.get(props.type).once((data, key) => {
  if (data) {
    for (let key in data) {
      counter.value[key] = true;
    }
  }
});

const count = computed(() => {
  return Object.keys(counter.value).length;
});
</script>

<style lang="stylus" scoped>
.bg
  position absolute
  top 0px
  left 10px
  font-size 5em !important
  z-index 1
  opacity 0.5

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
  z-index 5

section
  padding 0.5em
  z-index 5

.type
  flex 0 1 600px
  height 200px
  margin 1em
  position relative
  overflow hidden
  font-size 1em
  opacity 0.8
  cursor pointer
  transition all 300ms ease
  display flex
  flex-flow column nowrap
  align-items flex-start
  background-color var(--background)
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