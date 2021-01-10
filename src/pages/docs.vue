<template>
  <main>
    <div class="bar">Project app docs</div>
    <article class="content">
      <router-view v-slot="{ Component }">
        <transition name="fade">
          <component :is="Component" />
        </transition>
      </router-view>
    </article>
  </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  setup() {
    return {};
  },
});
</script>

<style scoped>
main {
  width: 100%;
}
.bar {
  padding: 1em;
  background-color: #333;
  color: #eee;
}
.content {
  padding: 1em 2em;
}
</style>