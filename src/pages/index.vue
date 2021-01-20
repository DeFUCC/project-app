<template lang="pug">
main
  img.logo(src="/icons/feeds.svg", alt="")
  .title
    h1 Feeds
    p desc
  router-link.card(to="/explore/") explore
  router-link.card(to="/users/") users
  app-install
</template>

<script setup lang="ts">
</script>

<style lang="stylus" scoped>
main
  display grid
  grid-template-columns 1fr 10fr
  grid-template-rows repeat(1fr)
  grid-template-areas 'logo info' 'app app'
  grid-gap 1em

.card
  padding 1em
  font-size 2em
  grid-column span 2
  background-color #ccc

.logo
  width 192px
  grid-area logo
</style>