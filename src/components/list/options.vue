<template lang="pug">
aside
  .title
    item-type(:type="type")
    h3 {{ $tc(`type.${type}`, sorted.total) }}
    .count {{ sorted.total }}
    .spacer
    button(:class="{ active: tag }", @click="tag = !tag")
      i.iconify(data-icon="la:tags")
    button(:class="{ active: order }", @click="order = !order")
      i.iconify(data-icon="la:sort-alpha-down")
    button(:class="{ active: filter }", @click="filter = !filter")
      i.iconify(data-icon="la:filter")
    button(:class="{ active: search }", @click="search = !search")
      i.iconify(data-icon="la:search")
    button(:class="{ active: add }", @click="add = !add")
      i.iconify(data-icon="la:plus")
  transition-group(name="fade")
    list-options-order(
      v-show="order",
      key="order",
      :by="options.orderBy",
      @order="options.orderBy = $event",
      v-if="sorted.total > 0"
    )
    list-options-filter(
      key="filter",
      v-show="filter",
      :my="options.filterMy",
      v-if="sorted.total > 0"
    )

    list-options-search(
      key="search",
      @search="options.search = $event",
      v-show="search",
      v-if="sorted.total > 3"
    )
    slot(v-if="add", key="add")
</template>

<script setup lang="ts">
import { defineProps, reactive, ref } from "vue";

const props = defineProps({
  open: Boolean,
  type: String,
  options: Object,
  sorted: Object,
});

const open = ref(props.open);
const add = ref(props.open);
const filter = ref(props.open);
const order = ref(props.open);
const search = ref(props.open);
const tag = ref(props.open);
</script>

<style lang="stylus" scoped>
.title
  display flex
  align-items center
  flex 1 1 100%
  padding 0 0.5em

.title button
  font-size 16px

aside
  display flex
  flex 1 1 100%
  position sticky
  align-self start
  z-index 20
  top 1em
  min-height 3em
  flex-flow row wrap
  align-items center
  justify-content flex-start
  padding 0.5em
  background-color var(--bar-color)
  margin 0.5em

aside.wide
  flex 1 0 200px

.tools > div
  flex 1 1 200px
  margin 1em 0

.tools .title
  display flex
  align-items center
  flex 1 1 100%
  margin 0

.count
  font-weight bold
  padding 0 0.5em
</style>