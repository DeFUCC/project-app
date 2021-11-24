<template lang="pug">
nav 
  router-link.card(to="/c/")
    .i-la-boxes
    .title Collectives
  router-link.card(to="/lab/timeline/")
    .i-la-calendar
    .title Timeline
  router-link.card(to="/graph/")
    .i-mdi-graph-outline
    .title Graph
</template>

<script setup>
</script>

<style lang="stylus" scoped>
nav
  display flex
  flex-flow column
  flex 10

.card
  display flex
  flex-flow row wrap
  align-items center
  font-size clamp(1em, 4em, 8vw)
  padding 1em
  margin 0.5em
  background-color var(--card-bg)

</style>