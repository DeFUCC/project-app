<template>
  <section class="search" :class="{ open: search.text }">
    <label for="search">
      <span class="iconify" data-icon="la:search"></span>
    </label>
    <input id="search" type="text" v-model="search.text" />
    <i @click.prevent.stop="search.text = ''" class="close"
      ><span class="iconify" data-icon="la:times-circle"></span
    ></i>
  </section>
</template>

<script lang="ts">
import { defineComponent, reactive, watch, watchEffect } from "vue";

export default defineComponent({
  emits: ["search"],
  setup(props, { emit }) {
    const search = reactive({
      text: "",
      open: false,
    });

    watchEffect(() => {
      emit("search", search.text);
    });

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
  margin: 0 0 0 1em;
  position: relative;
}
.search input {
  margin: 0;
  padding: 1em 1.4em;
  text-indent: 1.4em;
  border-radius: 2em;
  width: 4px;
  transition: all 300ms ease-in-out;
}
.search input:focus {
  width: 8em;
}
.search label {
  cursor: pointer;
  margin: -1px -1.7em 0 0;
  z-index: 10;
}

.close {
  cursor: pointer;
  right: 0.5em;
  display: none;
  z-index: 20;
}
.open .close {
  position: absolute;
  display: block;
}
</style>