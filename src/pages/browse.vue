<template>
  <main class="columns">
    <header>
      <div class="row">
        <router-link
          class="type"
          v-for="type in types"
          :key="type"
          :to="{ path: '/browse/' + type }"
        >
          <IconType :type="type" />
        </router-link>
      </div>
    </header>
    <section>list</section>
    <router-view></router-view>
  </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { types } from "../store/model";

export default defineComponent({
  setup() {
    return {
      types,
    };
  },
});
</script>

<style scoped>
.row {
  display: flex;
  align-items: center;
}
.type {
  font-size: 2em;
  opacity: 0.4;
  cursor: pointer;
  transition: all 300ms ease;
}
.type:hover {
  opacity: 0.7;
}
.type.active {
  opacity: 1;
}
</style>