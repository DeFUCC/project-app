<template>
  <main class="columns">
    <aside class="types">
      <div
        class="type"
        v-for="atype in types"
        :key="atype"
        :class="{ active: atype == type }"
        @click="$router.push({ path: atype })"
      >
        <IconType :type="atype" /> {{ atype }}s
        <span class="count"> </span>
      </div>
    </aside>
    <article class="column">
      <keep-alive>
        <ItemsList
          :key="type"
          :type="type"
          @open="feeds.open($event, -1)"
        ></ItemsList>
      </keep-alive>
    </article>

    <article v-for="(feed, num) in feeds.list" :key="num" class="column">
      <PageContainer
        @open="feeds.open($event, num)"
        @close="feeds.close(num)"
        :key="feed"
        :id="feed"
      >
      </PageContainer>
    </article>
  </main>
</template>

<script lang="ts">
import { onMounted, reactive, ref, watch, watchEffect } from "vue";
import { model, types } from "../../store/model";
import { itemColor } from "../../use/colors";
import { useRoute, useRouter } from "vue-router";
import { useTitle } from "@vueuse/core";
import { gun } from "../../store/gun-db";
export default {
  name: "Designs",
  props: {
    type: String,
  },
  setup(props) {
    const route = useRoute();
    const router = useRouter();
    const title = useTitle();
    const types = model.all;

    const feeds = reactive({
      type: route.query["type"] || "design",
      list: [],
      open(feed: any, num: number) {
        this.list[num + 1] = feed;
        this.list.splice(num + 2);
      },
      close(num: number) {
        this.list.splice(num, 1);
      },
    });

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
      if (route.query.id) {
        return;
      }
      let query = {};
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
  flex-flow: column nowrap;
  overflow-y: scroll;
  overflow-x: hidden;
  position: sticky;
  left: 0;
  background-color: var(--background);
}
.column.items {
  flex-flow: column wrap;
}
.bordered {
  border-left-width: 6px;
  border-left-style: solid;
}
.row {
  display: flex;
  align-items: center;
}
.types {
  min-width: max-content;
  scroll-snap-align: start end;
}
.type {
  font-size: 1em;
  opacity: 0.4;
  cursor: pointer;
  transition: all 300ms ease;
  display: flex;
  align-items: center;
  background-color: #ccc;
  padding: 0 0.4em 0 0;
}
.type img {
  font-size: 2em;
  height: 2em;
}
.type .count {
  font-size: 18px;
  white-space: nowrap;
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