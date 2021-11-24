<script setup >
import { getState } from "store@gun-db";
import { format } from "use@locale";

defineProps({
  item: Object,
});
</script>

<template lang="pug">
.date(v-if="item.createdAt && !item.updatedAt")
  | {{ format(item.createdAt).date }}
.date(v-if="item.updatedAt")
  .i-la-pen
  | {{ format(item.updatedAt).date }}
</template>



<style lang="stylus" scoped></style>