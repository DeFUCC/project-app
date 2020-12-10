<template>
  <article>
    <h1>Userinfo</h1>
  </article>
</template>

<script>
export default {
  props: {
    alias: String,
  },
  components: {},
  setup() {
    return {};
  },
};
</script>

<style scoped>
.edit-avatar {
  border-radius: 80px;
  display: flex;
  background-repeat: no-repeat;
  height: 100px;
  width: 100px;
  justify-content: center; /* align horizontal */
  align-items: center; /* align vertical */
  font-size: 4em;
  color: black;
  cursor: pointer;
  font-weight: bold;
}
</style>