<template>
  <article ref="page" class="page">
    <ItemCard
      @click="$emit('close')"
      @open="$emit('open', $event)"
      :item="item"
    />

    <section class="content">
      <button
        @click="
          $emit('open', {
            view: 'add',
            item: item.soul,
          })
        "
        v-if="canEdit"
      >
        <span class="iconify" data-icon="la:pen-alt"></span>
      </button>
      <div class="description" v-if="item.description">
        {{ item.description }}
      </div>
    </section>

    <ListItems
      @open="$emit('open', $event)"
      v-for="type in model[item.type]"
      :key="type"
      :type="type"
      :parent="item.soul"
    />
  </article>
</template>

<script lang="ts">
import { ref, watchEffect, computed } from "vue";
import { useItem } from "../../use/item";
import { model } from "../../store/model";
import { user } from "../../store/user";

export default {
  props: ["id"],
  emits: ["open", "close"],
  setup(props) {
    const item = ref({
      soul: null,
    });
    const page = ref(null);
    watchEffect(() => {
      item.value = useItem(props.id);
    });

    const canEdit = computed(() => {
      return user.is && user.is.pub == item.value.soul.slice(1, 88);
    });

    return {
      canEdit,
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