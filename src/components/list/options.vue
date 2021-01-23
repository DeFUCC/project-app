<template lang="pug">
aside
  .title
    item-type(:type="type")
    h3 {{ $tc(`type.${type}`, sorted.count) }}
    .count(v-if="sorted.total > 0") {{ sorted.count }} / {{ sorted.total }}
    .spacer
    .buttons(v-if="sorted.total > 0")
      button(:class="{ active: status }", @click="status = !status")
        i.iconify(data-icon="la:tags")
      button(
        :class="{ active: order }",
        @click="order = !order",
        v-if="sorted.total > minSearch"
      )
        i.iconify(data-icon="la:sort-alpha-down")
      button(
        :class="{ active: filter }",
        @click="filter = !filter",
        v-if="user.is"
      )
        i.iconify(data-icon="la:filter")
      button(
        :class="{ active: search }",
        @click="search = !search",
        v-if="sorted.total > minSearch"
      )
        i.iconify(data-icon="la:search")
    button(:class="{ active: add }", @click="add = !add")
      i.iconify(data-icon="la:plus")
  transition-group(name="fade")
    list-options-status(
      v-show="status",
      key="status",
      :count="sorted.status",
      :status="options.status"
    )
    list-options-order(
      v-show="order",
      key="order",
      :by="options.orderBy",
      @order="options.orderBy = $event"
    )
    list-options-filter(key="filter", v-show="filter", :my="options.filterMy")
    list-options-search(
      key="search",
      @search="options.search = $event",
      v-show="search"
    )
    slot(v-if="add", key="add")
</template>

<script setup lang="ts">
import { defineProps, reactive, ref } from "vue";
import { user } from "../../store/user";

const props = defineProps({
  open: Boolean,
  type: String,
  options: Object,
  sorted: Object,
});

const minSearch = 4;

const open = ref(props.open);
const add = ref(props.open);
const filter = ref(props.open);
const order = ref(props.open);
const search = ref(props.open);
const status = ref(true);
</script>

<style lang="stylus" scoped>
.title
  display flex
  align-items center
  flex 1 1 100%
  padding 0 0.5em

.title button
  font-size 16px

.title h3
  font-size 1em

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
  padding 0.25em 0.5em
  margin 0 0.5em
  background-color var(--button-secondary)
  border-radius 2em

.buttons
  display flex
  flex-flow row wrap
</style>