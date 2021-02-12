<template lang="pug">
page-container(
  v-if="itemSoul",
  :key="itemSoul",
  @open="$router.push(`/c/${collective}/${$event.type}/${$event.id}`)",
  @close="$router.push(`/c/${collective}/${type}`)",
  :id="itemSoul",
  :collective="collective"
)
</template>

<script setup >
import { defineProps, ref, watchEffect } from "vue";
import { db, gun, soul } from "store@gun-db";
import { itemColor } from "use@colors";

const props = defineProps({
  type: String,
  id: String,
  collective: String,
});

const itemSoul = ref();
watchEffect(() => {
  gun
    .get(props.collective)
    .get(props.type)
    .once((data, key) => {
      let id = props.id;
      itemSoul.value = data?.[id]?.["#"];
    });
});
</script>

<style lang="stylus" scoped></style>