<template>
  <ListHeader
    :parent="parent"
    :type="type"
    :options="items.options"
    :sorted="items.sorted"
  />

  <ul class="item-list">
    <transition-group name="list">
      <Item
        class="card"
        @click="
          $emit('open', {
            view: 'page',
            type: item.type,
            id: item.soul,
            title: item.title,
            parent: parent,
          })
        "
        v-for="item in items.sorted.list"
        :key="item.soul"
        :item="item"
      ></Item>
    </transition-group>
  </ul>
</template>

<script>
import { computed, reactive, ref, watchEffect } from "vue";
import { useItems } from "../use/items";

export default {
  name: "FeedItems",
  emits: ["open"],
  props: {
    type: {
      type: String,
      required: true,
    },
    parent: String,
  },

  setup(props) {
    const items = ref({});
    watchEffect(() => {
      items.value = useItems({
        type: props.type,
        parent: props.parent,
        user: props.user,
      });
    });

    return {
      items,
    };
  },
};
</script>

<style scoped>
.item-list {
  display: flex;
  align-items: stretch;
  flex-flow: column nowrap;
  padding: 0;
  margin: 0;
}
.card {
  scroll-snap-align: start end;
  margin: 0.5em;
}
</style>