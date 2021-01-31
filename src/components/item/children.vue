<template lang="pug">
.counters
  item-children-count(
    :id="id",
    :type="type",
    v-for="type in childTypes",
    :key="type"
  )
</template>

<script setup >
import { computed, defineProps, ref } from "vue";
import { gun } from "../../store/gun-db";
import { model } from "../../store/model";

const props = defineProps({
  id: String,
});
const type = ref();
gun
  .get(props.id)
  .get("type")
  .on((data) => {
    type.value = data;
  });
const childTypes = computed(() => {
  return model[type.value];
});
</script>

<style lang="stylus" scoped>
.counters
  flex 1 1 100%
  margin 0
  display flex
  justify-content stretch
  align-items stretch
  flex-flow row wrap
</style>