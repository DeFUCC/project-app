<template>
  <article>
    <header>Export</header>
    <main>
      {{ item }}
    </main>
  </article>
</template>

<script lang="ts">
import { useTitle } from "@vueuse/core";
import { defineComponent, reactive, ref, watchEffect } from "vue";
import { useRoute, useRouter } from "vue-router";
import { gun } from "../store/gun-db";

export default defineComponent({
  setup() {
    const route = useRoute();
    const router = useRouter();
    const title = useTitle();
    const id = ref();
    watchEffect(() => {
      id.value = route.query.id;
    });
    function close() {
      router.push({ path: "feed" });
    }
    function open(val) {
      router.push({
        query: {
          id: val,
        },
      });
    }
    const item = ref({});
    if (id.value) {
      gun.get(id.value).open((d) => {
        item.value = d;
      });
    }

    return {
      item,
      id,
      open,
      close,
    };
  },
});
</script>

<style scoped>
</style>