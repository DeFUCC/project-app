<template>
  <main class="columns">
    <article class="column" v-for="view in views" :key="view.item">
      <item-feed v-if="view.type == 'feed'" :type="view.item"></item-feed>
      <the-page v-if="view.type != 'feed'" :id="view.id"> </the-page>
    </article>
  </main>
</template>

<script>
import ItemFeed from "../../components/feed/ItemFeed.vue";
import ThePage from "../../components/page/ThePage.vue";

import { views } from "../../use/useViews.js";
export default {
  name: "Designs",
  components: {
    ItemFeed,
    ThePage,
  },
  setup() {
    return {
      views,
    };
  },
};
</script>

<style scoped>
.columns {
  display: flex;
  overflow-x: scroll;
  scroll-snap-type: x mandatory;
  overscroll-behavior-x: none;
}
.column {
  scroll-snap-align: start end;
  display: flex;
  flex-flow: column nowrap;
  max-width: 960px;
  min-width: 420px;
  height: 100vh;
}
</style>