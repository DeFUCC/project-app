<template>
  <article ref="page" class="page">
    <ItemCard :item="item.info" />

    <section class="content">
      <div class="description">
        {{ item.info.description }}
      </div>
      <small> {{ item.info.soul }} </small>
    </section>

    <ItemFeed
      v-if="item.info.type == 'design'"
      type="project"
      :root="item.info.soul"
    />
    <ItemFeed
      v-if="item.info.type == 'project'"
      type="object"
      :root="item.info.soul"
    />
  </article>
</template>

<script>
import { onMounted, ref, watchEffect } from "vue";
import { useItem } from "../../use/useItem";
import ItemFeed from "../feed/ItemFeed.vue";
import ItemCard from "../item/ItemCard.vue";
export default {
  props: ["id"],
  components: {
    ItemCard,
    ItemFeed,
  },
  setup(props) {
    const item = ref({});
    const page = ref(null);
    let mounted = false;
    watchEffect(() => {
      item.value = useItem(props.id);
      if (mounted) {
        page.value.scrollIntoView({ behavior: "smooth" });
      }
    });

    onMounted(() => {
      mounted = true;
      page.value.scrollIntoView({ behavior: "smooth" });
    });

    return {
      item,
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

.description {
  padding: 2em;
}
</style>