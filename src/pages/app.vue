<template>
  <article id="main">
    <AppHistory />
    <router-view v-slot="{ Component }">
      <transition name="slide-right">
        <component :is="Component" />
      </transition>
    </router-view>
  </article>
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
#main {
  overscroll-behavior-x: none !important;
  display: flex;
  flex-flow: column nowrap;
  height: 100vh;
  width: 100%;
}
</style>