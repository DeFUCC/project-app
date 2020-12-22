<template>
  <article>
    <h3>My Stars</h3>
    <Suspense>
      <div class="sus">
        <ItemAsyncCard
          :id="id"
          v-for="(value, id) in user.rates.star"
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
  setup(props) {
    return {
      user,
    };
  },
};
</script>

<style>
</style>

