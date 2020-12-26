<template>
  <article class="column">
    <header class="bar">
      <div class="title">
        <img
          v-if="type"
          class="icon bigger"
          :src="'/svg/' + type + '.svg'"
          alt=""
        />
        <span class="tag"
          >{{ items.sorted.count }}/{{ items.sorted.countAll }}
        </span>
      </div>

      <ListHeaderFilter
        :my="items.options.filterMy"
        @star="items.options.filterMy.star = !items.options.filterMy.star"
        @seen="items.options.filterMy.seen = !items.options.filterMy.seen"
        @trash="items.options.filterMy.trash = !items.options.filterMy.trash"
        v-if="items.sorted.countAll > 0"
      />
      <ListHeaderOrder
        :by="items.options.orderBy"
        @order="items.options.orderBy = $event"
        v-show="items.sorted.count > 0"
      />

      <div class="spacer"></div>
      <AddForm
        key="add"
        :type="type"
        :parent="parent"
        @search="items.options.search = $event"
      />
      <ListHeaderSearch
        @search="items.options.search = $event"
        v-if="items.sorted.countAll > 0"
      />
    </header>

    <ul class="item-list">
      <transition-group name="list">
        <ItemCard
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
        ></ItemCard>
      </transition-group>
    </ul>
  </article>
</template>

<script>
import { format } from "timeago.js";
import { computed, reactive, ref, watchEffect } from "vue";
import { itemColor } from "../../tools/colors";
import { useItems } from "../../use/items";

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
    let items;
    watchEffect(() => {
      items = useItems({
        type: props.type,
        parent: props.parent,
        user: props.user,
      });
    });

    return {
      items,
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
  align-items: center;
  justify-content: flex-start;
  padding: 1em;
  background-color: var(--bar-color);
  overflow-x: scroll;
}
.tag {
  font-size: 0.8em;
  display: block;
  color: var(--text-light);
  white-space: nowrap;
}
.bar > .title {
  padding: 0;
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
  height: 100%;
}
.card {
  scroll-snap-align: start end;

  margin: 0.5em;
}
.filters {
  padding: 0.5em;
  background-color: var(--bar-color);
  scroll-snap-align: start;
}
.column {
  scroll-snap-align: start;
  display: flex;
  flex: 1 0 360px;
  flex-flow: column nowrap;
  max-width: 960px;
  min-width: 360px;
  overflow-x: hidden;
}
</style>