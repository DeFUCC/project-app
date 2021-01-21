<template lang="pug">
.list-holder
  .bar
    item-type(:type="type")
    h3 {{ $tc(`type.${type}`, 10) }}
    page-list-filter(
      :my="options.filterMy",
      @star="options.filterMy.star = !options.filterMy.star",
      @seen="options.filterMy.seen = !options.filterMy.seen",
      @trash="options.filterMy.trash = !options.filterMy.trash",
      v-show="sorted.total > 0"
    )
    page-list-order(
      :by="options.orderBy",
      @order="options.orderBy = $event",
      v-show="sorted.total > 0"
    )
    .spacer
    page-list-search(
      @search="options.search = $event",
      v-show="sorted.total > 3"
    )

  add-form(:type="type", :parent="parent", v-if="editable")
  ul.item-list
    transition-group(name="list")
      item-card.card(
        @click="$emit('open', { id: item.id, type: type, soul: item.soul })",
        v-for="item in sorted.list",
        :key="item.soul",
        :item="item"
      )
    .more(ref="more", v-if="sorted.more", @click="loadMore()") {{ sorted.list.length }} / {{ sorted.count }}
</template>

<script setup lang="ts">
import { useIntersectionObserver } from "@vueuse/core";
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

const { sorted, options } = useItems(props.type, props.parent);

const open = ref(false);
const page = ref(7);
const more = ref(null);
const loading = ref(false);
function loadMore() {
  options.limit += page.value;
}

useIntersectionObserver(more, ([{ isIntersecting }]) => {
  if (isIntersecting) {
    loadMore();
  }
});
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

.more
  cursor pointer
  flex 1 1 100%
  opacity 0.6
  transition all 300ms ease
  display flex
  align-items center
  padding 3em
  justify-content center
  background-color var(--secondary-button)

.more:hover
  opacity 1

.more:active
  opacity 0.4
</style>