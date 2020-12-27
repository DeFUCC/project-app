<template>
  <span v-if="item.createdAt">
    {{ format(item.createdAt, "short") }}
    <span v-if="item.updatedAt">
      , upd {{ format(item.updatedAt, "short") }}
    </span>
  </span>
</template>

<script lang="ts">
import { format } from "timeago.js";
import { defineComponent } from "vue";

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