<template>
  <article ref="page" class="page">
    <ItemCard :item="item.info" />

    <section class="content">
      <div class="description">
        {{ item.info.description }}
      </div>
    </section>

    <ItemFeed
      @open="$emit('open', $event)"
      v-for="type in model[item.info.type]"
      :key="type"
      :type="type"
      :root="item.info.soul"
    />
  </article>
</template>

<script>
import { onMounted, ref, watchEffect } from "vue";
import { useItem } from "../use/useItem.ts";
import { model } from "../store/model.js";
export default {
  props: ["id"],
  emits: ["open"],
  setup(props) {
    const item = ref({});
    const page = ref(null);
    const mounted = ref(false);
    watchEffect(() => {
      item.value = useItem(props.id);
      if (mounted.value) {
        page.value.scrollIntoView({ behavior: "smooth" });
      }
    });

    onMounted(() => {
      mounted.value = true;
    });

    return {
      item,
      model,
      page,
    };
  },
};
</script>

<style scoped>
.page {
  color: #333;
  overflow-y: scroll;
  overflow-x: hidden;
}
.page > .card {
  margin: 0;
}

.description {
  padding: 2em;
}
</style>