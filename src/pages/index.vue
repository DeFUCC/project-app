<template>
  <article id="main">
    <section class="content">
      <div class="logo"><img src="/icons/feeds.svg" alt="Feeds logo" /></div>
      <div class="text">
        <h1>Welcome to the feeds!</h1>
        <p>This is Project App – the new approach to social collaboration</p>
      </div>
    </section>

    <section></section>
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
  overscroll-behavior-x: none !important;
  display: flex;
  flex-flow: row nowrap;
  justify-content: stretch;
  align-items: flex-start;
}
.logo {
  flex: 0 0 192px;
}
.content {
  flex: 1 1 auto;
  padding: 2em;
  display: flex;
  flex-flow: row wrap;
}
.button {
  padding: 1em 2em;
  background-color: #333;
  color: #eee;
  border-radius: 1em;
}
</style>