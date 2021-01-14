<template lang="pug">
section.bar
  icon-type(:type="type")
  items-filter(
    :my="options.filterMy",
    @star="options.filterMy.star = !options.filterMy.star",
    @seen="options.filterMy.seen = !options.filterMy.seen",
    @trash="options.filterMy.trash = !options.filterMy.trash",
    v-show="sorted.total > 0"
  )
  items-order(
    :by="options.orderBy",
    @order="options.orderBy = $event",
    v-show="sorted.total > 0"
  )
  .spacer
  add-form(key="add", :type="type", :parent="parent")
  items-search(@search="options.search = $event", v-show="sorted.total > 3")
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    parent: String,
    type: String,
    options: Object,
    sorted: Object,
  },
  setup() {
    return {};
  },
});
</script>

<style lang="stylus" scoped>
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