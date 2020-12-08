<template>
  <li
    @click="
      openView({
        type: item.type,
        id: item.soul,
      })
    "
    class="item"
    :style="{ backgroundColor: itemColor(item.soul) }"
  >
    <div class="main">
      <div class="title">
        <h2>{{ item.title }}</h2>
      </div>
      <div class="info">
        {{ item.type }} by <ItemAuthor :author="item.author"></ItemAuthor>
        {{ format(item.createdAt, "short") }}
        <span v-if="item.updatedAt">
          , upd {{ format(item.updatedAt, "short") }}
        </span>
      </div>
    </div>

    <div class="spacer"></div>
    <ItemRating :item="item.soul"></ItemRating>
  </li>
</template>

<script>
import { itemColor } from "../../use/colors.js";
import { format } from "timeago.js";
import { openView, views } from "../../use/useViews.js";
import ItemAuthor from "../item/ItemAuthor.vue";
import ItemRating from "./ItemRating.vue";
export default {
  props: {
    item: {
      type: Object,
      default: {
        type: "item",
        title: "Basic item",
        author: {
          alias: "No author",
          avatar: null,
        },
        createdAt: 345298357,
        updatedAt: 3482489005,
        soul: "example",
      },
    },
  },
  emits: ["view"],
  components: {
    ItemRating,
    ItemAuthor,
  },
  setup() {
    return {
      openView,
      views,
      itemColor,
      format,
    };
  },
};
</script>

<style scoped>
.title h2 {
  margin: 0;
  font-size: 1.2em;
  line-height: 1.4em;
}
.main {
  padding: 0.5em;
}
.item {
  cursor: pointer;
  display: flex;
  align-items: stretch;
  margin: 0.5em;
  padding: 0.5em;
  scroll-snap-align: start end;
}
.info {
  font-size: 0.7em;
}
</style>