<template>
  <section class="search">
    <label for="search"><IconSearch /></label>
    <input id="search" type="text" placeholder="search" v-model="search.text" />
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
  margin-left: 0.5em;
}
.search input {
  margin: 0;
  padding: 0.5em 1em;
  text-indent: 1.5em;
  border-radius: 2em;
}
.search label {
  margin-right: -1.5em;
  z-index: 10;
}
</style>