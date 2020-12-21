<template>
  <article class="column">
    <FeedListBar
      :count="items.sorted.count"
      :canAdd="canAdd"
      :type="type"
      @search="items.options.search = $event"
      @create="
        $emit('open', {
          view: 'edit',
          type: type,
          id: parent,
        })
      "
      @add="items.addItem()"
    />

    <ul class="item-list">
      <li class="filters">
        <FeedListFilters
          :options="items.options"
          @order="
            items.options.orderBy[$event] = !items.options.orderBy[$event]
          "
          class="fl"
        />
      </li>

      <transition-group name="list">
        <ItemCard
          @click="
            $emit('open', {
              view: 'page',
              type: item.type,
              id: item.soul,
            })
          "
          v-for="item in items.sorted.data"
          :key="item.soul"
          :item="item"
        ></ItemCard>
      </transition-group>
    </ul>
  </article>
</template>

<script>
import { format } from "timeago.js";
import { computed, ref, watchEffect } from "vue";
import { itemColor } from "../../tools/colors";
import { useItems } from "../../use/items";
import { user } from "../../store/user";
export default {
  name: "FeedItems",
  emits: ["open"],
  props: {
    type: {
      type: String,
      default: "design",
    },
    parent: {
      type: String,
      default: null,
    },
  },

  setup(props) {
    let items;
    watchEffect(() => {
      items = useItems({
        type: props.type,
        mode: "private",
        root: props.parent,
      });
    });

    const canAdd = computed(() =>
      Boolean(
        !items.adding.value &&
          ((!props.parent && user.is) ||
            (props.parent && user.is?.pub == props.parent.slice(1, 88)))
      )
    );

    return {
      user,
      items,
      canAdd,
      format,
      itemColor,
    };
  },
};
</script>

<style scoped>
.bar {
  display: flex;
  position: sticky;
  z-index: 20;
  top: 0;
  flex-flow: row nowrap;
  align-items: stretch;
  justify-content: flex-start;
  padding: 1em;
  background-color: var(--bar-color);
}

.bar > .title {
  padding: 0 1em 0 0;
  font-size: 1.2em;
  font-weight: bold;
  display: flex;
  align-items: center;
}

.item-list {
  display: flex;
  align-items: stretch;
  flex-flow: column nowrap;
  padding: 0;
  margin: 0;
  overflow: scroll;
  scroll-snap-type: y mandatory;
}
.filters {
  padding: 0.5em;
  background-color: var(--bar-color);
  scroll-snap-align: start;
}
</style>