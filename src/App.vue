<template>
  <app-bar />
  <history-bar />
  <main>
    <router-view v-slot="{ Component }">
      <transition name="fade">
        <keep-alive>
          <component v-if="$route.meta.keepAlive" :is="Component" />
        </keep-alive>
        
      </transition>
      <component v-if="!$route.meta.keepAlive" :is="Component" />
      <main>
    </router-view>
  </main>
</template>

<script>
import AppBar from "./components/core/AppBar.vue";
import HistoryBar from "./components/core/HistoryBar.vue";
export default {
  name: "Project app",
  components: {
    AppBar,
    HistoryBar,
  },
};
</script>

<style scoped>
</style>
