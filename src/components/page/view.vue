<template>
  <article ref="page" class="page">
    <ItemCard :item="item.info" @click="$emit('close')" />

    <section class="content">
      <div class="description" v-if="item.info.description">
        {{ item.info.description }}
      </div>
    </section>

    <ListItems
      @open="$emit('open', $event)"
      v-for="type in model[item.info.type]"
      :key="type"
      :type="type"
      :parent="item.info.soul"
    />
  </article>
</template>

<script lang="ts">
import { ref, watchEffect } from "vue";
import { useItem } from "../../use/item";
import { model } from "../../store/model";
export default {
  props: ["id"],
  emits: ["open", "close"],
  setup(props) {
    const item = ref({});
    const page = ref(null);
    watchEffect(() => {
      item.value = useItem(props.id);
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