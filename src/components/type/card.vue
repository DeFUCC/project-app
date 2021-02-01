<template lang="pug">
.type(v-if="count > 0")
  type-icon.bg(:type="type", path="color-lines")
  header
    .title {{ $tc(`type.${type}`, count) }}
    .spacer
    .count {{ count }}

  section
    .def {{ $t(`def.${type}`) }}
</template>

<script setup >
import { computed, defineProps, onUnmounted, ref } from "vue";
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
let listener = query.get(props.type).once((data) => {
  if (data) {
    for (let key in data) {
      if (data[key] && data[key] != "_") counter.value[key] = true;
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
  bottom 0px
  right 10px
  font-size 5em !important
  z-index 1
  opacity 0.6
  transition all 600ms ease-in
  transform-origin 80% 50%

.type:hover .bg
  transform scale(3)
  opacity 0.3
  transition all 1s ease-out

.title
  font-size 1.2em
  font-weight bold

.def
  padding 0.5em 0
  max-width 320px

.head
  padding 0.5em

header
  display flex
  align-items center
  flex 1
  width 100%
  z-index 5
  flex 1 1 2em

section
  padding 0.5em
  z-index 5
  flex 5

.type
  flex 1 1 300px
  height 200px
  margin 1em
  position relative
  overflow hidden
  font-size 1em
  cursor pointer
  transition all 300ms ease
  display flex
  flex-flow column nowrap
  align-items flex-start
  background-color var(--card-bg)
  padding 1em
  box-shadow 1px 4px 10px -6px hsla(0, 0%, 0%, 0)
  transition all 900ms ease-in-out

.type img
  font-size 1.4em
  height 2em

.type .count
  padding 8px
  font-size 1em
  white-space nowrap
  font-weight bold

.type:hover
  box-shadow 1px 4px 10px -6px hsla(0, 0%, 0%, 0.6)
</style>