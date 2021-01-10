<template>
  <article>
    <div class="row">{{ app.pub }}</div>
  </article>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
import { appPath, gun } from "../store/gun-db";

export default defineComponent({
  setup() {
    const app = reactive({});
    gun
      .get(appPath)
      .map()
      .on((data, key) => {
        app[key] = data;
      });
    return {
      app,
    };
  },
});
</script>

<style scoped>
article {
  padding: 2em;
}
</style>