<template lang="pug">
.holder
  list-options(
    :open="wide",
    :class="{ wide: wide }",
    :type="type",
    :options="options",
    :sorted="sorted",
    :editable="editable"
  )
    add-form(:type="type", :parent="parent", v-if="editable")
  ul.item-list
    transition-group(name="list")
      slot(:item="item", v-for="item in sorted.list", :key="item.soul")
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
  wide: Boolean,
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
  display flex
  flex-flow row wrap

.item-list
  grid-area list
  display flex
  flex 1 1 320px
  align-items stretch
  flex-flow row wrap
  padding 0
  margin 0
  min-height max-content

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
  background-color var(--button-secondary)

.more:hover
  opacity 1

.more:active
  opacity 0.4
</style>