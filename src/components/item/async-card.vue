<template lang="pug">
.row(v-if="item && item.title", :style="{ backgroundColor: itemColor(id) }")
  item-type(:type="item.type")
  .title {{ item.title }}
  router-link.link(v-if="item.id", :to="`/explore/${item.type}/${item.id}`") Explore
  router-link.link(:to="{ path: '/page', query: { id: id } }") Open
  item-date(:item="item")
</template>

<script lang="ts">
import { gun } from "../../store/gun-db";
import { itemColor } from "../../use/colors";
export default {
  props: ["id"],
  async setup(props) {
    let item = await gun.get(props.id);
    return {
      item,
      itemColor,
    };
  },
};
</script>

<style lang="stylus" scoped>
.row
  padding 1em
  display flex
  align-items center

.link
  padding 0 1em
</style>