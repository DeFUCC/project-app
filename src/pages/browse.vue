<template>
  <main class="columns">
    <router-view v-slot="{ Component }">
      <transition name="fade">
        <component :is="Component" />
      </transition>
    </router-view>
  </main>
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