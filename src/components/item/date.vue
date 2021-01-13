<template>
  <span v-if="item.createdAt && !item.updatedAt">
    {{ format(item.createdAt).date }}
  </span>
  <span v-if="item.updatedAt">
    <span class="iconify" data-icon="la:pen"></span>
    {{ format(item.updatedAt).date }}
  </span>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { getState } from "../../store/gun-db";
import { format } from "../../use/locale";

export default defineComponent({
  props: {
    item: Object,
  },
  setup() {
    return {
      getState,
      format,
    };
  },
});
</script>

<style scoped>
</style>