<template>
  <app-bar />
  <main class="main">
    <router-view v-slot="{ Component }">
      <keep-alive>
        <transition name="fade">
          <component :is="Component" />
        </transition>
      </keep-alive>
    </router-view>
  </main>
</template>

<script>
import AppBar from "./core/AppBar.vue";
export default {
  name: "Project app",
  components: {
    AppBar,
  },
};
</script>

<style scoped>
</style>
