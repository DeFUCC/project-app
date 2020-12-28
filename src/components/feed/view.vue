<template>
  <main class="columns">
    <transition-group name="feed">
      <article class="column" key="starter">
        <div class="row">
          <div
            class="type"
            v-for="type in types"
            :key="type"
            @click="list = type"
            :class="{ active: type == list }"
          >
            <IconType :type="type" />
          </div>
        </div>
        <ListItems @open="openFeed($event, -1)" :type="list"></ListItems>
      </article>

      <FeedColumn
        v-for="(feed, num) in feeds"
        :key="num"
        :feed="feed"
        @open="openFeed($event, num)"
        @close="closeFeed(num)"
      />
    </transition-group>
  </main>
</template>

<script>
import { ref } from "vue";
import { types } from "../../store/model";
import { useFeeds } from "../../use/feeds";
export default {
  props: {
    item: {
      type: String,
      default: "design",
    },
  },
  name: "Designs",
  setup(props) {
    const { feeds, closeFeed, openFeed } = useFeeds({
      type: "feed",
      item: props.item,
    });

    const list = ref("design");

    return {
      list,
      types,
      feeds,
      closeFeed,
      openFeed,
    };
  },
};
</script>

<style scoped>
.column {
  scroll-snap-align: start;
  display: flex;
  flex: 1 0 400px;
  flex-flow: column nowrap;
  overflow-y: scroll;
  overflow-x: hidden;
}
.row {
  display: flex;
  align-items: center;
}
.type {
  font-size: 2em;
  opacity: 0.4;
  cursor: pointer;
  transition: all 300ms ease;
}
.type:hover {
  opacity: 0.7;
}
.type.active {
  opacity: 1;
}
.columns {
  display: flex;
  overflow-x: scroll;
  overflow-y: hidden;
  scroll-snap-type: x mandatory;
  overscroll-behavior-x: none;
  width: 100%;
  -ms-overflow-style: -ms-autohiding-scrollbar;
  -webkit-overflow-scrolling: touch;
}
</style>