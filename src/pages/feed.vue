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

      <article
        v-for="(feed, num) in feeds"
        :key="num"
        class="column bordered"
        :style="{
          borderColor: itemColor(feed.parent),
        }"
      >
        <Page
          @open="openFeed($event, num)"
          @close="closeFeed(num)"
          :key="feed.id"
          :id="feed.id"
        >
        </Page>
      </article>
    </transition-group>
  </main>
</template>

<script lang="ts">
import { reactive, ref } from "vue";
import { types } from "../store/model";
import { useFeeds } from "../use/feeds";
import { itemColor } from "../tools/colors";
export default {
  props: {
    item: {
      type: String,
      default: "design",
    },
  },
  name: "Designs",
  setup(props) {
    const feeds = reactive([]);

    function openFeed(feed: any, num: number) {
      feeds[num + 1] = feed;
      feeds.splice(num + 2);
    }

    function closeFeed(num: number) {
      feeds.splice(num, 1);
    }

    const list = ref("design");

    return {
      list,
      types,
      feeds,
      itemColor,
      closeFeed,
      openFeed,
    };
  },
};
</script>

<style scoped>
.column {
  scroll-snap-align: start end;
  display: flex;
  flex: 1 0 400px;
  flex-flow: column nowrap;
  overflow-y: scroll;
  overflow-x: hidden;
  position: sticky;
  left: 0;
  background-color: var(--background);
}
.bordered {
  border-left-width: 6px;
  border-left-style: solid;
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