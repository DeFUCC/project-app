<template>
  <app-bar />
  <history-bar />
  <main>
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
