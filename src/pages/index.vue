<template lang="pug">
main#main
  img.logo(src="/icons/feeds.svg", alt="")
  .title
    h1 {{ $t('app.title') }}
    h3 {{ $t('app.welcome') }}
    p {{ $t('app.description') }}
  router-link.card(to="/org/") Collectives
  router-link.card(to="/explore/") Explore
  router-link.card(to="/users/") Users
  router-link.card(to="/timeline/") Timeline
  app-install
</template>

<script setup lang="ts">
import { useTitle } from "@vueuse/core";

useTitle("Feeds");
</script>

<style lang="stylus" scoped>
main
  display grid
  grid-template-columns 1fr 10fr
  grid-template-rows 200px
  grid-template-areas 'logo info' 'app app'
  grid-gap 1em
  padding 2em

.card
  padding 1em
  font-size 2em
  grid-column span 2
  background-color #ccc

.logo
  width 192px
  grid-area logo
</style>