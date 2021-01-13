<template>
  <router-view v-slot="{ Component }">
    <transition name="fade">
      <component :is="Component" />
    </transition>
  </router-view>
</template>

<script lang="ts">
import { onMounted, reactive, ref, watch, watchEffect } from "vue";

export default {
  name: "Designs",
  setup(props) {
    return {};
  },
};
</script>

<style scoped>
</style>