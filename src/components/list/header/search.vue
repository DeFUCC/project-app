<template>
  <section class="search">
    <label for="search">
      <span class="iconify" data-icon="la:search"></span>
    </label>
    <input id="search" type="text" placeholder="search" v-model="search.text" />
    <span
      class="iconify close"
      data-icon="la:times-circle"
      @click="search.text = ''"
    ></span>
  </section>
</template>

<script lang="ts">
import { defineComponent, reactive, watch } from "vue";

export default defineComponent({
  emits: ["search"],
  setup(props, { emit }) {
    const search = reactive({
      text: "",
      open: false,
    });

    watch(
      () => search.text,
      (val) => {
        emit("search", search.text);
      }
    );

    return {
      search,
    };
  },
});
</script>

<style scoped>
.search {
  display: flex;
  align-items: center;
  margin: 0 2em;
}
.search input {
  margin: 0;
  padding: 0.5em 1em;
  text-indent: 1.4em;
  border-radius: 2em;
}
.search label {
  cursor: pointer;
  margin: -1px -1.4em 0 0;
  z-index: 10;
}
.close {
  cursor: pointer;
  margin: -1.4em;
}
</style>