<template>
  <article id="main">
    <h1>Welcome!</h1>
    <p>This is Project App – the new approach to social collaboration</p>
    <section>
      <router-link class="button" to="/app">Go to the app</router-link>
      <router-link class="button" to="/docs/">Docs</router-link>
    </section>
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
section {
  display: flex;
  flex-flow: row wrap;
}
.button {
  padding: 1em 2em;
  background-color: #333;
  color: #eee;
  border-radius: 1em;
  margin: 1em;
}
</style>