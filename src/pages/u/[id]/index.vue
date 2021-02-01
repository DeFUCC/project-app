<template lang="pug">
.list(v-if="pub")
  type-card(
    @click="$router.push(`/u/${id}/${type}`)",
    v-for="type in types",
    :key="type",
    :type="type",
    :parent="pub ? `~${pub}/${appPath}` : null"
  )
</template>

<script setup >
import { defineProps, ref } from "vue";
import { appPath, db, soul } from "../../../store/gun-db";

import { types } from "../../../store/model";

const props = defineProps({
  id: String,
});

const pub = ref();

db.get("user")
  .get(props.id)
  .get("pub")
  .once((d, k) => {
    pub.value = d;
  });
</script>

<style lang="stylus" scoped></style>