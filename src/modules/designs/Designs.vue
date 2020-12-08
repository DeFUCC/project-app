<template>
  <main class="columns">
    <article class="column" v-for="(view, key) in views" :key="view.item">
      <div
        :style="{ backgroundColor: itemColor(view.id) }"
        v-if="key > 0"
        class="sticky"
        @click="closeView(key)"
      >
        {{ key }} close
      </div>
      <item-feed v-if="view.type == 'feed'" :type="view.item"></item-feed>
      <the-page v-if="view.type != 'feed'" :id="view.id"> </the-page>
    </article>
  </main>
</template>

<script>
import ItemFeed from "../../components/feed/ItemFeed.vue";
import ThePage from "../../components/page/ThePage.vue";
import { itemColor } from "../../use/colors";

import { views, closeView } from "../../use/useViews.js";
export default {
  name: "Designs",
  components: {
    ItemFeed,
    ThePage,
  },
  setup() {
    return {
      views,
      itemColor,
      closeView,
    };
  },
};
</script>

<style scoped>
.sticky {
  position: sticky;
  top: 0;
}
.columns {
  display: flex;
  overflow-x: scroll;
  scroll-snap-type: x mandatory;
  overscroll-behavior-x: none;
  -ms-overflow-style: -ms-autohiding-scrollbar;
  -webkit-overflow-scrolling: touch;
}
.column {
  border-right: 1px dashed #999;
  scroll-snap-align: start end;
  display: flex;
  flex: 1 1 360px;
  flex-flow: column nowrap;
  max-width: 960px;
  min-width: 360px;
  height: 100vh;
}
</style>