<template>
  <div class="card">{{ user }}</div>
</template>

<script>
export default {
  props: ["user"],
  setup() {
    return {};
  },
};
</script>

<style scoped>
.card {
  padding: 2em;
}
</style>