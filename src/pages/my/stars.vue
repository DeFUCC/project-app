<template>
  <article>
    <h3>My Stars</h3>
    <Suspense>
      <div class="sus">
        <ItemAsyncCard
          :id="id"
          v-for="(value, id) in user.rating"
          :key="id"
        ></ItemAsyncCard>
      </div>
    </Suspense>
  </article>
</template>

<script>
import { reactive } from "vue";
import { user } from "../../store/user";

export default {
  props: {
    user: String,
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