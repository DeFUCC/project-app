<template>
  <article>
    <h3>My Stars</h3>
    <Suspense>
      <div class="sus">
        <ItemAsyncCard
          :id="value"
          v-for="(value, id) in stars"
          :key="id"
        ></ItemAsyncCard>
      </div>
    </Suspense>
  </article>
</template>

<script>
import { computed, reactive, ref, watchEffect } from "vue";
import { user } from "../../store/user";

export default {
  setup(props) {
    const stars = computed(() => {
      return (
        user?.rates?.star &&
        Object.values(user.rates.star).filter((star) => {
          return star;
        })
      );
    });
    return {
      user,
      stars,
    };
  },
};
</script>

<style>
</style>

