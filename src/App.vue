<template>
  <AppBar />
  <AppHistory />
  <router-view v-slot="{ Component }">
    <transition name="slide-right">
      <component :is="Component" />
    </transition>
  </router-view>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { itemColor } from "./tools/colors";
export default defineComponent({
  name: "Project app",
  setup() {
    return {
      itemColor,
    };
  },
});
</script>

<style scoped>
.low {
  height: 2em;
  font-size: 10px;
  text-align: center;
  background-color: #eee;
}
</style>
