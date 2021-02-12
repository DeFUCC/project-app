<template lang="pug">
.collective
  .types 
    type-icon.type(
      @click="$router.push(`/c/${collective}/${atype}`)",
      :class="{ active: atype == type }",
      v-for="atype in types",
      :key="atype",
      :type="atype"
    )
  router-view(v-slot="{ Component }")
    transition(name="fade")
      component(:is="Component")
</template>

<script setup >
import { computed, defineProps } from "vue";
import { model, organisations } from "store@model";

const props = defineProps({
  type: String,
  collective: String,
});

const types = computed(() => {
  if (organisations[props.collective]) {
    return Object.keys(organisations[props.collective].model);
  } else {
    return Object.keys(model);
  }
});
</script>

<style lang="stylus" scoped>
.title
  cursor: pointer

.types
  display: flex
  align-items: center
  overflow-x: scroll

.type
  font-size: 1.5em
  opacity: 0.2
  transition: all 300ms ease
  cursor: pointer

.type:hover
  opacity: 1

.type.active
  opacity: 0.8</style>