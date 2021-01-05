<template>
  <main class="columns">
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

      <List @open="openFeed($event, -1)" :key="list" :type="list"></List>
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
        :key="feed"
        :id="feed"
      >
      </Page>
    </article>
  </main>
</template>

<script lang="ts">
import { onMounted, reactive, ref, watch, watchEffect } from "vue";
import { types } from "../store/model";
import { itemColor } from "../tools/colors";
import { useRoute, useRouter } from "vue-router";
import { useTitle } from "@vueuse/core";
import { gun } from "../store/gun-db";
export default {
  name: "Designs",
  setup(props) {
    const feeds = reactive([]);
    const route = useRoute();
    const router = useRouter();
    const list = ref("design");
    const title = useTitle();
    onMounted(() => {
      for (let q in route.query) {
        if (q == "type") {
          list.value = route.query[q] as string;
          continue;
        }
        feeds[q] = route.query[q];
      }
    });
    watchEffect(() => {
      let query = {
        type: list.value,
      };
      feeds.forEach((feed, i) => {
        query[i] = feed;
      });
      router.push({ query: query });
      if (feeds.length > 0) {
        setTitle(feeds[feeds.length - 1]);
      } else {
        title.value = "Project app: " + list.value;
      }
    });
    function openFeed(feed: any, num: number) {
      feeds[num + 1] = feed;
      feeds.splice(num + 2);
    }
    function closeFeed(num: number) {
      feeds.splice(num, 1);
    }
    async function setTitle(id) {
      title.value = await gun.get(id).get("title");
    }
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
@media screen and (min-device-width: 900px) {
  .column {
    flex: 1 0 600px !important;
  }
}
.column {
  scroll-snap-align: start end;
  display: flex;
  flex: 1 0 100%;
  max-width: 600px;
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