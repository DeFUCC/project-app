<template lang="pug">
.date(v-if="item.createdAt && !item.updatedAt")
  | {{ format(item.createdAt).date }}
.date(v-if="item.updatedAt")
  span.iconify(data-icon="la:pen")
  | {{ format(item.updatedAt).date }}
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

<style lang="stylus" scoped></style>