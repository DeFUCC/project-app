<template lang="pug">
main#main
  .title Collectives /
    router-link(to="/c/") {{ organisations?.[collective]?.title || collective }}
  router-view(v-slot="{ Component }")
    transition(name="fade")
      component(:is="Component")
</template>

<script setup >
import { defineProps } from "vue";
import { organisations } from "store@model";

const props = defineProps({
  collective: String,
});
</script>

<style lang="stylus" scoped>
.title
  padding: 0.5em 1em
</style>