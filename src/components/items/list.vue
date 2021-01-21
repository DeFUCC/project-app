<template lang="pug">
.list-holder
  .bar
    item-type(:type="type")
    h3 {{ $tc(`type.${type}`, 10) }}
    items-list-filter(
      :my="options.filterMy",
      @star="options.filterMy.star = !options.filterMy.star",
      @seen="options.filterMy.seen = !options.filterMy.seen",
      @trash="options.filterMy.trash = !options.filterMy.trash",
      v-show="sorted.total > 0"
    )
    items-list-order(
      :by="options.orderBy",
      @order="options.orderBy = $event",
      v-show="sorted.total > 0"
    )
    .spacer
    items-list-search(
      @search="options.search = $event",
      v-show="sorted.total > 3"
    )

  add-form(:type="type", :parent="parent", v-if="editable")
  ul.item-list
    transition-group(name="list")
      item-card.card(
        @click="$emit('open', item.soul); $emit('explore', { id: item.id, type })",
        v-for="item in sorted.list",
        :key="item.soul",
        :item="item"
      )
</template>

<script setup lang="ts">
import { defineEmit, ref, defineProps } from "vue";
import { user } from "../../store/user";
import { useItems } from "../../use/items";

const emit = defineEmit(["open"]);
const props = defineProps({
  type: {
    type: String,
    required: true,
  },
  parent: String,
  editable: Boolean,
});
const open = ref(false);
const { sorted, options } = useItems(props.type, props.parent);
</script>

<style lang="stylus" scoped>
.list-holder
  border var(--border-thin)
  border-radius var(--small-radius)
  margin-bottom 2em

.item-list
  display flex
  align-items stretch
  flex-flow row wrap
  padding 0
  margin 0
  min-height max-content

.card
  scroll-snap-align start end
  margin 0.5em

.bar
  display flex
  position sticky
  z-index 20
  top 0
  flex 0 0 60px
  min-height 3em
  flex-flow row nowrap
  align-items center
  justify-content flex-start
  padding 0.5em
  background-color var(--bar-color)
  margin 0

.tag
  font-size 0.8em
  display block
  color var(--text-light)
  white-space nowrap
</style>