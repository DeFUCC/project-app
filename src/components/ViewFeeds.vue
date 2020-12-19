<template>
  <main class="columns">
    <transition-group name="feed">
      <ItemFeed
        @open="openView($event, -1)"
        :type="item"
        key="starter"
      ></ItemFeed>
      <article
        class="column"
        v-for="(view, key) in views"
        :key="key"
        :style="{
          borderColor: itemColor(view.id ? view.id.substring(1, 88) : 0),
        }"
      >
        <div
          :style="{ backgroundColor: itemColor(view.id) }"
          class="sticky"
          @click="closeView(key)"
        >
          {{ key }} close
        </div>

        <ThePage @open="openView($event, key)" :id="view.id"> </ThePage>
      </article>
    </transition-group>
  </main>
</template>

<script>
import { itemColor } from "../tools/colors";
import { useViews } from "../use/views";
export default {
  props: {
    item: {
      type: String,
      default: "design",
    },
  },
  name: "Designs",
  setup(props) {
    const { views, closeView, openView } = useViews({
      type: "feed",
      item: props.item,
    });
    return {
      views,
      itemColor,
      closeView,
      openView,
    };
  },
};
</script>

<style >
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
  border-left: 4px solid #eee;
  scroll-snap-align: start;
  display: flex;
  flex: 1 0 360px;
  flex-flow: column nowrap;
  max-width: 960px;
  min-width: 360px;
  overflow-y: hidden;
}

.column:last-child {
  scroll-snap-align: end;
}
</style>