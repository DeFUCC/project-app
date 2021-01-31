<template lang="pug">
.date(v-if="item.createdAt && !item.updatedAt")
  | {{ format(item.createdAt).date }}
.date(v-if="item.updatedAt")
  span.iconify(data-icon="la:pen")
  | {{ format(item.updatedAt).date }}
</template>

<script setup >
import { defineComponent, defineProps } from "vue";
import { getState } from "../../store/gun-db";
import { format } from "../../use/locale";

defineProps({
  item: Object,
});
</script>

<style lang="stylus" scoped></style>