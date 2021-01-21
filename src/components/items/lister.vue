<template lang="pug">
.holder
  aside
    .title
      item-type(:type="type")
      h3 {{ $tc(`type.${type}`, 10) }}
      .spacer
      .count {{ sorted.total }}
      span.open(@click="open = !open")
        i.iconify(data-icon="la:chevron-down")
    .tools(:class="{ open }") {{ $t(`def.${type}`) }}
      items-lister-order(
        :by="options.orderBy",
        @order="options.orderBy = $event",
        v-show="sorted.total > 0"
      )
      items-lister-filter(:my="options.filterMy", v-show="sorted.total > 0")

      items-lister-search(
        @search="options.search = $event",
        v-show="sorted.total > 3"
      )

  ul.item-list
    add-form(:type="type", :parent="parent", v-if="editable")
    transition-group(name="list")
      item-card.card(
        @click="$emit('open', { id: item.id, type: type, soul: item.soul })",
        v-for="item in sorted.list",
        :key="item.id",
        :item="item"
      )
    .more(ref="more", v-if="sorted.more", @click="loadMore()") {{ sorted.list.length }} / {{ sorted.count }}
</template>

<script setup lang="ts">
import { useIntersectionObserver } from "@vueuse/core";
import { defineEmit, ref, defineProps } from "vue";
import { user } from "../../store/user";
import { useItems } from "../../use/items";
useIntersectionObserver;

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
.holder
  display grid
  grid-template-columns minmax(280px, 30%) 1fr
  grid-template-areas 'title list' 'filter list'

.open
  display none

@media (max-width 700px)
  .holder
    grid-template-columns 1fr
    grid-template-areas 'title' 'filter' 'list'

  .tools:not(.open)
    display none

  .open
    display block

ul
  grid-area list
  display flex
  flex 1 1 420px
  align-items stretch
  flex-flow row wrap
  padding 0
  margin 0
  min-height max-content

.card
  margin 0.5em

.title
  display flex
  align-items center
  flex 1 1 100%

aside
  display flex
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
  margin 1em

.tools > div
  flex 1 1 200px
  margin 1em 0

.tools .title
  display flex
  align-items center
  flex 1 1 100%
  margin 0

.tag
  font-size 0.8em
  display block
  color var(--text-light)
  white-space nowrap

.count
  font-weight bold
  padding 0 1em

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