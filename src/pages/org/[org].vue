<template lang="pug">
main#main
  .title 
    router-link(to="/org/") Organisations / {{ organisations?.[org]?.title || org }}
  router-view(v-slot="{ Component }")
    transition(name="fade")
      component(:is="Component")
</template>

<script setup lang="ts">
import { defineProps } from "vue";
import { organisations } from "../../store/model";

const props = defineProps({
  org: String,
});
</script>

<style lang="stylus" scoped>
.title
  padding 0.5em 1em
</style>