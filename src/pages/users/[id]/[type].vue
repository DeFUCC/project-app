<template lang="pug">
.list 
  type-row(@choose="$router.push(`/users/${id}/${$event}`)", :active="type")
  list-items(
    :wide="false",
    :key="type",
    :type="type",
    :editable="user?.is?.pub == pub",
    :parent="userPath",
    @open="$router.push(`/explore/${type}/${$event.id}`)"
  )
</template>

<script setup lang="ts">
import { computed, defineProps, ref } from "vue";
import { appPath, db } from "../../../store/gun-db";
import { model, types } from "../../../store/model";
import { user } from "../../../store/user";

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
  .once((d, k) => {
    pub.value = d.pub;
  });
</script>

<style lang="stylus" scoped></style>