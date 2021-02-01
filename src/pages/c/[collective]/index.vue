<template lang="pug">
.types {{ organisations?.[collective] }}
  type-counter(
    @click="$router.push(`/c/${collective}/${type}`)",
    v-for="type in types",
    :key="type",
    :type="type",
    :parent="collective"
  )
</template>

<script setup >
import { computed, defineProps } from "vue";
import { useTitle } from "@vueuse/core";
import { model, organisations } from "../../../store/model";

const props = defineProps({
  collective: String,
});
useTitle(`Explore ${props.collective}`);

function explore(ev) {
  console.log(ev);
}

const types = computed(() => {
  if (organisations[props.collective]) {
    return Object.keys(organisations[props.collective].model);
  } else {
    return Object.keys(model);
  }
});
</script>

<style lang="stylus" scoped>
.collective
  padding 1em

.title
  padding 0.5em 1em

.types
  display grid
  grid-gap 1em
  padding 1em
  grid-template-columns repeat(auto-fill, minmax(300px, 1fr))
</style>