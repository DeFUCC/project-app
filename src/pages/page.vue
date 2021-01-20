<template lang="pug">
main
  transition(name="fade")
    keep-alive
      page-container(
        v-if="id",
        @open="open",
        @close="close",
        :key="id",
        :id="id"
      )
</template>

<script setup lang="ts">
import { useTitle } from "@vueuse/core";
import { useRoute, useRouter } from "vue-router";
import { onMounted, reactive, ref, watchEffect } from "vue";
import { gun } from "../store/gun-db";

const route = useRoute();
const router = useRouter();
const title = useTitle();
const id = ref();
watchEffect(() => {
  id.value = route.query.id;
});
function close() {
  router.push({ path: "/design" });
}
function open(val) {
  router.push({
    query: {
      id: val,
    },
  });
}
</script>

<style lang="stylus" scoped></style>