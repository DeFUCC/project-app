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
        <span class="tag">{{ items.sorted.count }}</span>
      </div>
      <button
        :class="{ active: items.options.orderBy == 'AB' }"
        @click="items.options.orderBy = 'AB'"
      >
        <span class="iconify" data-icon="la:sort-alpha-down"></span>
      </button>

      <button
        :class="{ active: items.options.orderBy == 'createdAt' }"
        @click="items.options.orderBy = 'createdAt'"
      >
        <span class="iconify" data-icon="la:sort-numeric-up-alt"></span>
      </button>
      <div class="spacer"></div>
      <ListHeaderSearch @search="items.options.search = $event" />
      <button
        v-if="canAdd"
        @click="
          $emit('open', {
            view: 'add',
            type: type,
            id: parent,
          })
        "
      >
        <span class="iconify" data-icon="la:plus-circle"></span>
      </button>
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
        parent: props.parent,
      });
    });

    const canAdd = computed(() =>
      Boolean(
        (!props.parent && user.is) ||
          (props.parent && user.is?.pub == props.parent.slice(1, 88))
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
.tag {
  font-size: 0.8em;
  color: var(--text-light);
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
.iconify {
  font-size: 1.4em;
}
</style>