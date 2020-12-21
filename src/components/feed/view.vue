<template>
  <main class="columns">
    <transition-group name="feed">
      <ListItems
        @open="openFeed($event, -1)"
        :type="item"
        key="starter"
      ></ListItems>
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

    return {
      feeds,
      closeFeed,
      openFeed,
    };
  },
};
</script>

<style scoped>
.columns {
  display: flex;
  overflow-x: scroll;
  overflow-y: hidden;
  scroll-snap-type: x mandatory;
  overscroll-behavior-x: none;
  -ms-overflow-style: -ms-autohiding-scrollbar;
  -webkit-overflow-scrolling: touch;
}
</style>