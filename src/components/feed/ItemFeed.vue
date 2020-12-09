<template>
  <header class="bar">
    <div class="title">
      {{ type }} <span class="tag">{{ items.sorted.count }}</span>
    </div>
    <button
      v-for="(by, key) in items.options.orderBy"
      :key="key"
      :class="{ active: by }"
      @click="items.options.orderBy[key] = !items.options.orderBy[key]"
    >
      {{ key }}
    </button>

    <button
      v-if="!root || (root && user.is.pub == root.substring(1, 88))"
      @click="items.addItem()"
    >
      add
    </button>
  </header>
  <item-list :items="items.sorted.data"></item-list>
</template>

<script>
import { itemColor } from "../../use/colors.js";
import { format } from "timeago.js";
import { useItems } from "../../use/useItems.js";
import ItemList from "./ItemList.vue";
import { ref, watchEffect } from "vue";
import { user } from "../../use/useUser.js";
export default {
  name: "ItemFeed",
  props: {
    type: {
      type: String,
      default: "design",
    },
    root: {
      type: String,
      default: null,
    },
  },
  components: {
    ItemList,
  },
  setup(props) {
    const items = ref({});
    watchEffect(() => {
      items.value = useItems({
        type: props.type,
        mode: "private",
        root: props.root,
      });
    });

    return {
      user,
      items,
      format,
      itemColor,
    };
  },
};
</script>

<style scoped>
.bar {
  z-index: 20;
}
</style>