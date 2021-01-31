<template lang="pug">
aside
  .title
    type-icon(:type="type")
    h3(@click="$emit('toggle')") {{ $tc(`type.${type}`, sorted.count) }}
    .count(v-if="sorted.total > 0") {{ sorted.count }} / {{ sorted.total }}
    button(
      :class="{ active: state.add }",
      @click="state.add = !state.add",
      v-if="user.is && editable"
    )
      i.iconify(data-icon="la:plus")
    button.link(
      v-if="user.is && editable && false",
      :class="{ active: options.link }",
      @click="options.link = !options.link"
    )
      i.iconify(data-icon="la:link")
    .spacer
    .buttons(v-if="sorted.total > 0")
      button(
        :class="{ active: state.status }",
        @click="state.status = !state.status"
      )
        i.iconify(data-icon="la:tags")
      button(
        :class="{ active: state.order }",
        @click="state.order = !state.order",
        v-if="sorted.total > minSearch"
      )
        i.iconify(data-icon="la:sort-alpha-down")
      button(
        :class="{ active: state.filter }",
        @click="state.filter = !state.filter",
        v-if="user.is"
      )
        i.iconify(data-icon="la:filter")
      button(
        :class="{ active: state.search }",
        @click="state.search = !state.search",
        v-if="sorted.total > minSearch"
      )
        i.iconify(data-icon="la:search")

  .filters
    transition-group(name="fade")
      list-options-status(
        v-show="state.status",
        key="status",
        :count="sorted.status",
        :status="options.status"
      )
      list-options-order(
        v-show="state.order",
        key="order",
        :by="options.orderBy",
        @order="options.orderBy = $event",
        v-if="sorted.total > minSearch"
      )
      list-options-filter(
        key="filter",
        v-show="state.filter",
        :my="options.filterMy",
        v-if="user.is"
      )
      list-options-search(
        key="search",
        @search="options.search = $event",
        v-show="state.search",
        v-if="sorted.total > minSearch"
      )
      slot(v-if="state.add", key="add")
</template>

<script setup >
import { useStorage } from "@vueuse/core";
import { defineEmit, reactive, defineProps, ref } from "vue";
import { user } from "../../store/user";

const props = defineProps({
  open: Boolean,
  type: String,
  options: Object,
  sorted: Object,
  editable: Boolean,
});

const state = useStorage("list-options", {
  open: false,
  add: false,
  filter: false,
  order: false,
  status: true,
  search: false,
});

const emit = defineEmit(["toggle"]);

const minSearch = 4;

const open = ref(props.open);
const add = ref(props.open);
const filter = ref(props.open);
const order = ref(props.open);
const search = ref(props.open);
const status = ref(true);
</script>

<style lang="stylus" scoped>
@media screen and (max-width 610px)
  aside
    position static !important

.title
  display flex
  flex-flow row wrap
  align-items center
  flex 1 1 100%
  padding 0 0.5em
  background-color var(--background)
  border-bottom 1px solid var(--text-color)

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
  top 0
  min-height 3em
  flex-flow row wrap
  align-items center
  justify-content flex-start
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

.link.active
  animation blink 1200ms ease infinite

.buttons
  display flex
  flex-flow row wrap

.filters
  display flex
  flex-flow row wrap
  width 100%
  background-color var(--background-transparent)
</style>