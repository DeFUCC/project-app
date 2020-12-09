<template>
  <AppBar />
  <HistoryBar />
  <router-view v-slot="{ Component }">
    <transition name="slide-right">
      <component :is="Component" />
    </transition>
  </router-view>
</template>

<script>
import AppBar from "./components/core/AppBar.vue";
import HistoryBar from "./components/core/HistoryBar.vue";
import { itemColor } from "./use/colors.js";
export default {
  name: "Project app",
  components: {
    AppBar,
    HistoryBar,
  },
  setup() {
    return {
      itemColor,
    };
  },
};
</script>

<style scoped>
.low {
  height: 2em;
  font-size: 10px;
  text-align: center;
  background-color: #eee;
}
</style>
