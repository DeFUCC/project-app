<template lang="pug">
.list 
  type-row(@choose="$router.push(`/u/${id}/${$event}`)", :active="type")
  list-items(
    v-if="userPath",
    :wide="false",
    :key="type",
    :type="type",
    :editable="user?.is?.pub == pub",
    :parent="userPath",
    @open="$router.push({ path: '/page', query: { id: $event.soul } })"
  )
</template>

<script setup >
import { computed, defineProps, ref } from "vue";

import { appPath, db } from "store@gun-db";
import { model, types } from "store@model";
import { user } from "store@user";

const props = defineProps({
  type: String,
  id: String,
});

const pub = ref();

const userPath = computed(() => {
  return pub.value ? `~${pub.value}/${appPath}` : null;
});

db.get("user")
  .get(props.id)
  .get("pub")
  .once((d, k) => {
    pub.value = d;
  });
</script>

<style lang="stylus" scoped></style>