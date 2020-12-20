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
import { user } from "../../use/user";

export default {
  props: {
    user: String,
  },
  components: {
    ItemCard: defineAsyncComponent(() =>
      import("../../components/ItemAsyncCard.vue")
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