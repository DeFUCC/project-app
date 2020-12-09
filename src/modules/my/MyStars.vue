<template>
  <article>
    <h3>My Stars</h3>
  </article>
</template>

<script>
import ItemFeed from "../../components/feed/ItemFeed.vue";
export default {
  props: {
    user: String,
  },
  components: {
    ItemFeed,
  },
  setup() {
    return {};
  },
};
</script>

<style>
</style>