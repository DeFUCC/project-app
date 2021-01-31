<template lang="pug">
page-container(
  v-if="itemSoul",
  :key="itemSoul",
  @open="$router.push(`/explore/${$event.type}/${$event.id}`)",
  @close="$router.push(`/explore/${type}`)",
  :id="itemSoul"
)
</template>

<script setup >
import { defineProps, ref, watchEffect } from "vue";
import { db, soul } from "../../../store/gun-db";
import { itemColor } from "../../../use/colors";

const props = defineProps({
  type: String,
  id: String,
});

const itemSoul = ref();
watchEffect(() => {
  db.get(props.type).once((data, key) => {
    let id = props.id;
    itemSoul.value = data?.[id]?.["#"];
  });
});
</script>

<style lang="stylus" scoped></style>