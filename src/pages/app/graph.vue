<template>
  <article class="page">
    <div class="panel">
      <router-link to="./">Graph</router-link>
      <router-link to="network">Network</router-link>
      <router-link to="export">Export</router-link>
    </div>

    <router-view></router-view>
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
.page {
  width: 100%;
}
.panel {
  padding: 1em;
  background-color: #aaa;
  position: sticky;
  top: 0;
  display: flex;
}
.panel a {
  margin: 0 0.5em;
}
article {
  overflow-y: scroll;
}
.router-link-exact-active {
  color: #222;
}
</style>