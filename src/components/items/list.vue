<template lang="pug">
.list-holder
  items-header(
    :parent="parent",
    :type="type",
    :options="items.options",
    :sorted="items.sorted"
  )
  add-form(
    :type="type",
    :parent="parent",
    v-if="editable",
    @search="items.options.search = $event"
  )
  ul.item-list
    transition-group(name="list")
      item-card.card(
        @click="$emit('open', item.soul)",
        v-for="item in items.sorted.list",
        :key="item.soul",
        :item="item"
      )
</template>

<script>
import { computed, defineComponent, reactive, ref, watchEffect } from "vue";
import { useItems } from "../../use/items";

export default defineComponent({
  name: "FeedItems",
  emits: ["open"],
  props: {
    type: {
      type: String,
      required: true,
    },
    parent: String,
    editable: Boolean,
  },

  setup(props) {
    const items = useItems({
      type: props.type,
      parent: props.parent,
      user: props.user,
    });

    return {
      items,
    };
  },
});
</script>

<style lang="stylus" scoped>
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
</style>