<template>
  <span v-if="item.createdAt">
    {{ format(item.createdAt).date }}
    <span v-if="item.updatedAt"> , upd {{ format(item.updatedAt).date }} </span>
  </span>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { format } from "../../tools/locale";

export default defineComponent({
  props: {
    item: Object,
  },
  setup() {
    return {
      format,
    };
  },
});
</script>

<style scoped>
</style>