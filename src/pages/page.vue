<template lang="pug">
main
  transition(name="fade")
    keep-alive
      page-container(v-if="id", @open="open", :key="id", :id="id")
</template>

<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import { onMounted, reactive, ref, watchEffect } from "vue";
import { gun } from "../store/gun-db";

const route = useRoute();
const router = useRouter();
const id = ref();
watchEffect(() => {
  id.value = route.query.id;
});

function open(val) {
  router.push({
    query: {
      id: val.soul,
    },
  });
}
</script>

<style lang="stylus" scoped>
main
  padding 1em
</style>