<template>
  <section>
    <ItemsHeader
      :parent="parent"
      :type="type"
      :options="items.options"
      :sorted="items.sorted"
    />

    <ul class="item-list">
      <transition-group name="list">
        <ItemCard
          class="card"
          @click="$emit('open', item.soul)"
          v-for="item in items.sorted.list"
          :key="item.soul"
          :item="item"
        ></ItemCard>
      </transition-group>
    </ul>
  </section>
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

<style scoped>
.item-list {
  display: flex;
  align-items: stretch;
  flex-flow: row wrap;
  padding: 0;
  margin: 0;
  min-height: max-content;
}
.card {
  scroll-snap-align: start end;
  margin: 0.5em;
}
</style>