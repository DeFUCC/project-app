<template lang="pug">
main 
  .types
    .type(
      @click="$router.push(`/explore/${atype}`)",
      :class="{ active: atype == type }",
      v-for="atype in types",
      :key="atype"
    )
      item-type(:type="atype")
  router-view(v-slot="{ Component }")
    transition(name="fade")
      component(:is="Component")
</template>

<script setup lang="ts">
import { defineProps } from "vue";
import { model } from "../../store/model";
const props = defineProps({
  type: String,
});
const types = Object.keys(model);
</script>

<style lang="stylus" scoped>
main
  overflow-x hidden

.types
  display flex

.type
  font-size 1.5em
  opacity 0.2
  transition all 300ms ease
  cursor pointer

.type:hover
  opacity 1

.type.active
  opacity 0.8
</style>