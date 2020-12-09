<template>
  <article class="pane">
    <div id="panel">All users here</div>
    <router-view></router-view>
  </article>
</template>

<script>
export default {
  components: {},
  setup() {},
};
</script>

<style scoped>
.pane {
  overflow-y: scroll;
  padding: 2em;
}
#panel {
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  justify-content: space-between;
}
.avatar {
  border-radius: 80px;
  width: 50px;
  height: 50px;
}
</style>