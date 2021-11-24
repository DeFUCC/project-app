<template lang="pug">
.route(v-if="reversed.length > 0")
  span.path(
    @click="$emit('open', { id: item.id, type: item.type, soul: item.soul })",
    v-for="(item, i) in reversed",
    :key="item",
    :style="{ backgroundColor: itemColor(soul(item)) }"
  )
    type-icon(:type="item.type")
    span.title {{ item.title }}
</template>

<script setup >
import {  reactive, defineProps, watchEffect, computed } from "vue";
import { cutUuid, gun, soul } from "store@gun-db";
import { itemColor } from "use@colors";

const props = defineProps({
  id: String,
});
defineEmits(["open"]);
const list = reactive([]);
const reversed = computed(() => {
  return [...list].reverse();
});

watchEffect(async () => {
  list.length = 0;
  let id = props.id;
  for (let p = 0; p < 12; p++) {
    if (!id) {
      break;
    }
    let item = await gun.get(id).then();
    if (item && item.type && item.title) {
      item.id = cutUuid(id);
      item.soul = id;
      list[p] = item;
    }
    id = item?.parent;
  }
});
</script>

<style lang="stylus" scoped>
.route
  display: flex
  flex-flow: row wrap
  flex: 1 1 100%
  align-items: flex-start
  font-size: 0.9em
  line-height: 1.4em

.path
  display: flex
  align-items: center
  flex: 1 1 auto
  align-self: flex-start
  padding: 0.1em 0.5em
  overflow: hidden
  cursor: pointer
  transition: all 300ms ease

.path:hover .title
  min-width: max-content

.title
  transition: all 300ms ease-in-out
</style>