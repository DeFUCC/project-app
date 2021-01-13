<template>
  <article>
    <PageContainer v-if="id" @open="open" @close="close" :key="id" :id="id">
    </PageContainer>
  </article>
</template>

<script lang="ts">
import { useTitle } from "@vueuse/core";
import { useRoute, useRouter } from "vue-router";
import { onMounted, reactive, ref, watchEffect } from "vue";
import { gun } from "../store/gun-db";

export default {
  setup() {
    const route = useRoute();
    const router = useRouter();
    const title = useTitle();
    const id = ref();
    watchEffect(() => {
      id.value = route.query.id;
    });
    function close() {
      router.push({ path: "/browse" });
    }
    function open(val) {
      router.push({
        query: {
          id: val,
        },
      });
    }
    return {
      id,
      open,
      close,
    };
  },
};
</script>

<style scoped>
article {
  width: 100%;
  overflow-y: scroll;
}
</style>