<template>
  <main class="columns">
    <article class="column" key="starter">
      <div class="row">
        <div
          class="type"
          v-for="type in types"
          :key="type"
          @click="feeds.type = type"
          :class="{ active: type == feeds.type }"
        >
          <IconType :type="type" />
        </div>
      </div>
      <keep-alive>
        <ItemsList
          @open="feeds.open($event, -1)"
          :key="feeds.type"
          :type="feeds.type"
        ></ItemsList>
      </keep-alive>
    </article>

    <article v-for="(feed, num) in feeds.list" :key="num" class="column">
      <Page
        @open="feeds.open($event, num)"
        @close="feeds.close(num)"
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
    const feeds = reactive({
      type: "design",
      list: [],
      open(feed: any, num: number) {
        this.list[num + 1] = feed;
        this.list.splice(num + 2);
      },
      close(num: number) {
        this.list.splice(num, 1);
      },
    });

    const route = useRoute();
    const router = useRouter();
    const title = useTitle();

    onMounted(() => {
      for (let q in route.query) {
        if (q == "type") {
          feeds.type = route.query[q] as string;
          continue;
        }
        feeds.list[q] = route.query[q];
      }
    });

    watchEffect(() => {
      let query = {
        type: feeds.type,
      };
      feeds.list.forEach((feed, i) => {
        query[i] = feed;
      });
      router.push({ query: query });
      if (feeds.list.length > 0) {
        setTitle();
      } else {
        title.value = "Project app: " + feeds.type;
      }
    });

    function setTitle() {
      let id = feeds.list[feeds.list.length - 1];
      if (id) {
        gun.get(id).once((val) => {
          title.value = val.type + " " + val.title;
        });
      }
    }
    return {
      types,
      feeds,
      itemColor,
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