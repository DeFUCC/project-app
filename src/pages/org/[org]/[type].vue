<template lang="pug">
.org
  .types 
    type-icon.type(
      @click="$router.push(`/org/${org}/${atype}`)",
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
import { model, organisations } from "../../../store/model";

const props = defineProps({
  type: String,
  org: String,
});

const types = computed(() => {
  if (organisations[props.org]) {
    return Object.keys(organisations[props.org].model);
  } else {
    return Object.keys(model);
  }
});
</script>

<style lang="stylus" scoped>
.title
  cursor pointer

.types
  display flex
  align-items center
  overflow-x scroll

.type
  font-size 1.5em
  opacity 0.2
  transition all 300ms ease
  cursor pointer

.type:hover
  opacity 1

.type.active
  opacity 0.8</style>