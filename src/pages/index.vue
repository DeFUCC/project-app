<template>
  <article class="markdown">
    <img class="logo" src="/icons/feeds.svg" alt="" />
    <readme />
  </article>
</template>

<script lang="ts">
import { defineComponent } from "vue";
//@ts-ignore
import readme from "../pages/about/readme.md";

export default defineComponent({
  components: {
    readme,
  },
  setup() {
    return {};
  },
});
</script>

<style scoped>
article {
  padding: 1em 2em;
  overflow-y: scroll;
  overflow-x: hidden;
  height: 100%;
  scroll-margin-bottom: 20px;
}
.logo {
  width: 192px;
}
</style>