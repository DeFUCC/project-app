<template>
  <article>
    <h1>{{ page.title }}</h1>
    <p>{{ page.subtitle }}</p>
    <div class="design" v-for="(design, i) in page.feed" :key="i">
      {{ design.title }}
      {{ design.subtitle }}
    </div>
  </article>
</template>

<script>
import useFetch from "../../use/fetch.js";
export default {
  setup() {
    return {
      ...useFetch("http://localhost:8000/designs.json"),
    };
  },
};
</script>

<style scoped>
</style>