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
      <button :disabled="!canAdd" @click="items.addItem()">add</button>
      <div class="spacer"></div>
      <FeedSearch @search="items.options.search = $event" />
    </header>

    <ul class="item-list">
      <li class="filters">
        <FeedFilters
          :options="items.options"
          @order="
            items.options.orderBy[$event] = !items.options.orderBy[$event]
          "
        />
      </li>

      <transition-group name="list">
        <ItemCard
          @open="$emit('open', $event)"
          v-for="project in items.sorted.data"
          :key="project.soul"
          :item="project"
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
    root: {
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
        root: props.root,
      });
    });

    const canAdd = computed(
      () =>
        !items.adding.value &&
        ((!props.root && user.is) ||
          (props.root && user.is?.pub == props.root.slice(1, 88)))
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