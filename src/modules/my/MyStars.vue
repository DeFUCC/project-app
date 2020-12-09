<template>
  <article>
    <h3>My Stars</h3>
    <Suspense>
      <div class="sus">
        <ItemCard
          :id="id"
          v-for="(value, id) in user.rating"
          :key="id"
        ></ItemCard>
      </div>
    </Suspense>
  </article>
</template>

<script>
import { defineAsyncComponent, reactive } from "vue";
import ItemFeed from "../../components/feed/ItemFeed.vue";
import { user } from "../../use/useUser.js";

export default {
  props: {
    user: String,
  },
  components: {
    ItemFeed,
    ItemCard: defineAsyncComponent(() =>
      import("../../components/item/ItemAsyncCard.vue")
    ),
  },
  setup(props) {
    const items = reactive([]);

    return {
      user,
      items,
    };
  },
};
</script>

<style>
</style>