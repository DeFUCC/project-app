<template>
  <article id="main">
    <h1>Welcome!</h1>
    <p>This is Project App – the new approach to social collaboration</p>
    <router-link class="button" :to="{ path: '/app' }"
      >Go to the app</router-link
    >
  </article>
</template>

<script>
export default {
  setup() {
    return {};
  },
};
</script>

<style scoped>
#main {
  padding: 2em;
  overscroll-behavior-x: none !important;
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: flex-start;
  height: 100vh;
}
.button {
  padding: 1em 2em;
  background-color: #333;
  color: #eee;
  border-radius: 1em;
}
</style>