<template lang="pug">
page-container(
  v-if="itemSoul",
  :key="itemSoul",
  @open="$router.push(`/org/${org}/${$event.type}/${$event.id}`)",
  @close="$router.push(`/org/${org}/${type}`)",
  :id="itemSoul",
  :parent="org"
)
</template>

<script setup lang="ts">
import { defineProps, ref, watchEffect } from "vue";
import { db, gun, soul } from "../../../../store/gun-db";
import { itemColor } from "../../../../use/colors";

const props = defineProps({
  type: String,
  id: String,
  org: String,
});

const itemSoul = ref();
watchEffect(() => {
  gun
    .get(props.org)
    .get(props.type)
    .once((data, key) => {
      let id = props.id;
      itemSoul.value = data?.[id]?.["#"];
    });
});
</script>

<style lang="stylus" scoped></style>