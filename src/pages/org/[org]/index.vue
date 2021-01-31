<template lang="pug">
.types {{ organisations?.[org] }}
  type-counter(
    @click="$router.push(`/org/${org}/${type}`)",
    v-for="type in types",
    :key="type",
    :type="type",
    :parent="org"
  )
</template>

<script setup >
import { computed, defineProps } from "vue";
import { useTitle } from "@vueuse/core";
import { model, organisations } from "../../../store/model";

const props = defineProps({
  org: String,
});
useTitle(`Explore ${props.org}`);

function explore(ev) {
  console.log(ev);
}

const types = computed(() => {
  if (organisations[props.org]) {
    return Object.keys(organisations[props.org].model);
  } else {
    return Object.keys(model);
  }
});
</script>

<style lang="stylus" scoped>
.org
  padding 1em

.title
  padding 0.5em 1em

.types
  display grid
  grid-gap 1em
  padding 1em
  grid-template-columns repeat(auto-fill, minmax(300px, 1fr))
</style>