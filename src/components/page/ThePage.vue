<template>
  <article class="page">
    <PageHeader :item="item.info" />
    {{ item.info.soul }}
    <section class="content">
      <div class="description">
        {{ item.info.description }}
      </div>

      <button @click="item.addChild('project')">Add project</button>
      <div class="card" v-for="child in item.children" :key="child">
        {{ child.title }}
      </div>
      <ItemFeed type="project" :root="item.info.soul" />
    </section>
  </article>
</template>

<script>
import { reactive, ref, watchEffect } from "vue";
import { useItem } from "../../use/useItem";
import PageHeader from "./PageHeader.vue";
import ItemFeed from "../feed/ItemFeed.vue";
export default {
  props: ["id"],
  components: {
    PageHeader,
    ItemFeed,
  },
  setup(props) {
    const item = ref({});
    watchEffect(() => {
      item.value = useItem(props.id);
    });

    return {
      item,
    };
  },
};
</script>

<style scoped>
.page {
  color: #333;
  overflow: scroll;
}

.content {
  padding: 1em;
}
</style>