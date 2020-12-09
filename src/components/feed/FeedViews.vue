<template>
  <main class="columns">
    <transition-group name="fade">
      <article class="column" v-for="(view, key) in views" :key="view">
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
    </transition-group>
  </main>
</template>

<script>
import ItemFeed from "./ItemFeed.vue";
import ThePage from "../page/ThePage.vue";
import { itemColor } from "../../use/colors.js";

import { useViews } from "../../use/useViews.js";
export default {
  props: {
    item: {
      type: String,
      default: "design",
    },
  },
  name: "Designs",
  components: {
    ItemFeed,
    ThePage,
  },
  setup(props) {
    const { views, closeView } = useViews({
      type: "feed",
      item: props.item,
    });

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
  overflow-y: hidden;
  scroll-snap-type: x mandatory;
  overscroll-behavior-x: none;
  -ms-overflow-style: -ms-autohiding-scrollbar;
  -webkit-overflow-scrolling: touch;
}
.column {
  border-right: 1px dashed #999;
  scroll-snap-align: start;
  display: flex;
  flex: 1 0 360px;
  flex-flow: column nowrap;
  max-width: 960px;
  min-width: 360px;
  height: 100vh;
}

.column:last-child {
  scroll-snap-align: end;
}
</style>