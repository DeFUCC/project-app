<template>
  <li
    @click="
      openView({
        type: item.type,
        root: views[views.length],
        id: item.soul,
      })
    "
    class="item"
    :style="{ backgroundColor: itemColor(item.soul) }"
  >
    <div class="title info">
      <h3>{{ item.title }}</h3>
      {{ item.type }}
    </div>
    <ItemAuthor :author="item.author"></ItemAuthor>
    <div class="info">
      {{ format(item.createdAt) }}
    </div>
    <div class="info" v-if="item.updatedAt">
      Updated: {{ format(item.updatedAt) }}
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
import ItemRating from "./ItemSyncRating.vue";
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
.item {
  display: flex;
  align-items: stretch;
  margin: 0.5em;
  padding: 0.5em;
  scroll-snap-align: start;
}
</style>