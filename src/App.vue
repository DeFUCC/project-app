<template>
  <app-bar />
  <history-bar />
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
import HistoryBar from "./core/HistoryBar.vue";
export default {
  name: "Project app",
  components: {
    AppBar,
    HistoryBar,
  },
};
</script>

<style scoped>
.main {
  padding: var(--body-padding);
}
</style>
