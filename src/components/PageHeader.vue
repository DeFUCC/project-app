<template>
  <header
    class="page-header"
    :style="{ backgroundColor: itemColor(item.soul) }"
  >
    <h2>{{ item.title }}</h2>
    <ItemAuthor :author="item.author"></ItemAuthor>
    <div class="info">
      {{ format(item.createdAt) }}
    </div>
    <div class="info" v-if="item.updatedAt">
      Updated: {{ format(item.updatedAt) }}
    </div>
    <div class="spacer"></div>
    <ItemRating :item="item.soul"></ItemRating>
  </header>
</template>

<script>
import { itemColor } from "../tools/colors";
import { format } from "timeago.js";
export default {
  props: {
    item: Object,
  },
  setup() {
    return {
      itemColor,
      format,
    };
  },
};
</script>

<style>
.page-header {
  display: flex;
  flex-flow: row wrap;
  padding: 1em;
}
</style>