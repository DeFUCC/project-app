<template lang="pug">
main
  header
    h1 LAB
    p Feeds laboratory
  router-view(v-slot="{ Component }")
    transition(name="fade")
      component(:is="Component")
</template>

<script setup>
</script>

<style lang="stylus" scoped>
main
  display flex
  flex-flow column nowrap

header
  flex 1
  padding 2em
</style>