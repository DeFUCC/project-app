<template lang="pug">
main.columns
  .types
    .head {{ appPath }}
    items-type(
      v-for="atype in types",
      :key="atype",
      :class="{ active: atype == type }",
      :type="atype"
    )
</template>

<script lang="ts">
import { computed, onMounted, reactive, ref, watch, watchEffect } from "vue";
import { model } from "../../store/model";
import { itemColor } from "../../use/colors";
import { useRoute, useRouter } from "vue-router";
import { useTitle } from "@vueuse/core";
import { appPath, gun } from "../../store/gun-db";

export default {
  name: "Browse",
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
      appPath,
      itemColor,
    };
  },
};
</script>

<style lang="stylus" scoped>
@media screen and (min-width 900px)
  .column
    flex 1 0 600px !important

.columns
  display flex
  overflow-x scroll
  overflow-y hidden
  scroll-snap-type x mandatory
  overscroll-behavior-x none
  width 100%
  scroll-behavior smooth
  scroll-snap-stop always
  -ms-overflow-style -ms-autohiding-scrollbar
  -webkit-overflow-scrolling touch

.column
  scroll-snap-align start end
  display flex
  flex 0 0 100%
  flex-flow column nowrap
  overflow-y scroll
  overflow-x hidden
  position sticky
  left 0
  background-color var(--background)

.column.items
  flex-flow column wrap

.bordered
  border-left-width 6px
  border-left-style solid

.row
  display flex
  align-items center

.head
  padding 1em

.types
  min-width max-content
  flex 1 1 100%
  scroll-snap-align start
  overflow-y scroll
  height 100%
  display flex
  flex-flow column nowrap
  justify-content stretch
</style>