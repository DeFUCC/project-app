<template lang="pug">
.row
  span.path(
    @click="$emit('open', { id: parent.id, type: parent.type })",
    v-for="(parent, i) in route",
    :key="parent",
    :style="{ backgroundColor: itemColor(parent.soul) }",
    :class="{ item: i == route.length - 1 }"
  )
    item-type(:type="parent.type")
    span.title {{ parent.title }}
</template>

<script setup lang="ts">
import { defineEmit, reactive, defineProps, watchEffect } from "vue";
import { cutUuid, gun, soul } from "../../store/gun-db";
import { itemColor } from "../../use/colors";

const props = defineProps({
  id: String,
});
defineEmit(["open"]);
const route = reactive([]);

watchEffect(() => {
  route.length = 0;
  let id = props.id;
  for (let p = 0; p < 12; p++) {
    if (!id) {
      break;
    }
    gun.get(id).once((item) => {
      if (item && item.type && item.title) {
        route[p] = item;
        route[p].soul = id;
        route[p].id = cutUuid(id);
        id = item?.parent;
      }
    });
  }
  route.reverse();
});
</script>

<style lang="stylus" scoped>
.row
  display flex
  flex-flow row wrap
  flex 1 1 100%
  align-items flex-start

.path
  display flex
  align-items center
  flex 1 1 100%
  padding 0.1em 0.5em
  max-width max-content
  overflow hidden
  cursor pointer
  transition all 300ms ease

.path:hover .title
  min-width max-content

.title
  transition all 300ms ease-in-out
</style>