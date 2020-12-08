<template>
  <article>
    <item-feed type="project"></item-feed>
  </article>
</template>

<script>
import ItemFeed from "../../components/feed/ItemFeed.vue";
export default {
  name: "Projects",
  components: {
    ItemFeed,
  },
  setup() {
    return {};
  },
};
</script>

<style scoped>
</style>