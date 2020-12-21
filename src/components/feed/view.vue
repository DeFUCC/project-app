<template>
  <main class="columns">
    <transition-group name="feed">
      <FeedList
        @open="openFeed($event, -1)"
        :type="item"
        key="starter"
      ></FeedList>
      <section
        class="column"
        v-for="(feed, num) in feeds"
        :key="num"
        :style="{
          borderColor: itemColor(feed.id ? feed.id.substring(1, 88) : 0),
        }"
      >
        <div
          :style="{ backgroundColor: itemColor(feed.id) }"
          class="sticky bar"
        >
          <div class="title">{{ num }}: {{ feed }}</div>
          <div class="spacer"></div>
          <div class="close" @click="closeFeed(num)"><IconClose /></div>
        </div>

        <EditItem
          v-if="feed.view == 'edit'"
          :parent="feed.id"
          :type="feed.type"
        />

        <PageView
          v-if="feed.view == 'page'"
          @open="openFeed($event, num)"
          :key="feed.id"
          :id="feed.id"
        >
        </PageView>
      </section>
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
.bar {
  font-size: 0.8em;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  padding: 0.5em;
}
.close {
  font-size: 1.4em;
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