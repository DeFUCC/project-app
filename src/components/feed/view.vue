<template>
  <main class="columns">
    <transition-group name="feed">
      <FeedList
        @open="openFeed($event, -1)"
        :type="item"
        key="starter"
      ></FeedList>
      <section
        class="column bordered"
        v-for="(feed, num) in feeds"
        :key="num"
        :style="{
          borderColor: itemColor(feed.parent),
        }"
      >
        <div
          :style="{ backgroundColor: itemColor(feed.id) }"
          class="sticky bar"
        >
          <IconType :type="feed.type" />
          <div class="title">{{ feed.title }}</div>
          <div class="spacer"></div>
          <div class="close" @click="closeFeed(num)"><IconClose /></div>
        </div>

        <AddItem
          v-if="feed.view == 'add'"
          :parent="feed.id"
          :type="feed.type"
          :key="feed.id"
          @added="closeFeed(num)"
        />

        <PageView
          v-if="feed.view == 'page'"
          @open="openFeed($event, num)"
          @close="closeFeed(num)"
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

<style scoped>
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
.bordered {
  border-left: 6px solid #eee;
}
.column {
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