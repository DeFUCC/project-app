<template>
  <article>
    <div id="panel">All users here</div>

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