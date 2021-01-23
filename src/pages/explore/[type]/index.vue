<template lang="pug">
list-items(
  :wide="true",
  v-slot="{item}",
  :key="type",
  :type="type",
  :editable="true"
)
  item-card.card(
    @click="$router.push(`/explore/${type}/${item.id}`)",
    :options="{ route: false }",
    :key="item.soul",
    :item="item"
  )
</template>

<script setup lang="ts">
import { defineProps } from "vue";

const props = defineProps({
  type: String,
});

function explore(ev) {
  console.log(ev);
}
</script>

<style lang="stylus" scoped></style>