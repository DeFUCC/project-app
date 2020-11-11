<template>
  <section>Hey{{ id }}</section>
</template>

<script>
export default {
  props: {
    id: String,
  },
  setup() {
    return {};
  },
};
</script>

<style>
</style>