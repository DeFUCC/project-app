<template lang="pug">
main#main
  .panel
    router-link(to="/graph/") Graph
    router-link(to="/graph/network/") Network
    router-link(to="/graph/export/") Export
    router-link(to="/graph/tools/") Tools
  router-view(v-slot="{ Component }")
    transition(name="fade")
      component(:is="Component")
</template>

<script setup lang="ts">
</script>

<style lang="stylus" scoped>
.panel
  padding 1em
  background-color #aaa
  position sticky
  top 0
  display flex
  overflow-x scroll
  white-space nowrap

.panel a
  margin 0 0.5em

.router-link-exact-active
  color #222
</style>