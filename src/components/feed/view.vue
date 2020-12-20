<template>
  <main class="columns">
    <transition-group name="feed">
      <FeedItems
        @open="openFeed($event, -1)"
        :type="item"
        key="starter"
      ></FeedItems>
      <article
        class="column"
        v-for="(feed, key) in feeds"
        :key="key"
        :style="{
          borderColor: itemColor(feed.id ? feed.id.substring(1, 88) : 0),
        }"
      >
        <div
          :style="{ backgroundColor: itemColor(feed.id) }"
          class="sticky"
          @click="closeFeed(key)"
        >
          {{ key }} <IconClose />
        </div>

        <PageView @open="openFeed($event, key)" :key="feed.id" :id="feed.id">
        </PageView>
      </article>
    </transition-group>
  </main>
</template>

<script>
import { itemColor } from "../../tools/colors";
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
      itemColor,
      feeds,
      closeFeed,
      openFeed,
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