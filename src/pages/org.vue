<template lang="pug">
main
  .title 
    router-link(to="/org/") Organisations
  router-view(v-slot="{ Component }")
    component(:is="Component")
</template>

<script setup lang="ts">
</script>

<style lang="stylus" scoped>
.title
  padding 0.5em
  background-color var(--top-bar)
</style>