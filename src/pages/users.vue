<template lang="pug">
main.columns
  .column
    items-list(type="user", @open="feeds.open($event, -1)")
  .column(v-for="(feed, num) in feeds.list", :key="num")
    page-container(
      @open="feeds.open($event, num)",
      @close="feeds.close(num)",
      :key="feed",
      :id="feed"
    )
</template>

<script lang="ts">
import { onMounted, reactive, ref, watch, watchEffect } from "vue";
import { model } from "../store/model";
import { itemColor } from "../use/colors";
import { useRoute, useRouter } from "vue-router";
import { useTitle } from "@vueuse/core";
import { gun } from "../store/gun-db";
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
        title.value = "Project app: " + props.type;
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


<style lang="stylus" scoped></style>