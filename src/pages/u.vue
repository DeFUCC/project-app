<template lang="pug">
main#main
  .header
    router-link(to="/u") Users
  router-view(v-slot="{ Component }")
    transition(name="fade")
      component(:is="Component")
</template>

<script setup >
</script>

<style lang="stylus" scoped>
main
  display flex
  flex-flow column

.header
  padding 1em
</style>