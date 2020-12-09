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
import { useItem } from "../../use/useItem.js";
import { model } from "../../store/model.js";
import ItemFeed from "../feed/ItemFeed.vue";
import ItemCard from "../item/ItemCard.vue";
export default {
  props: ["id"],
  emits: ["open"],
  components: {
    ItemCard,
    ItemFeed,
  },
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
  overflow: scroll;
}
.page > .card {
  margin: 0;
}

.description {
  padding: 2em;
}
</style>