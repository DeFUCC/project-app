<template lang="pug">
main#main
  header
    img.logo(src="/icons/feeds.svg", alt="")
    .welcome
      .title
        h1 {{ $t('app.title') }}
          router-link.pad(to="/about/")
            span ABOUT
        .spacer
        app-locale
      .info
        p {{ $t('app.description') }}
  router-link.card(to="/explore/") Explore
  router-link.card(to="/u/") Users
  app-install
</template>

<script setup >
import { useTitle } from "@vueuse/core";

useTitle("Feeds");
</script>

<style lang="stylus" scoped>
main
  display flex
  flex-flow column

header
  display flex
  flex-flow row wrap
  padding 1em
  align-items center
  justify-content center

.welcome
  display flex
  flex-flow row wrap

.title
  flex 1 1 200px
  display flex

.card
  padding 1em
  margin 0.5em
  font-size 2em
  background-color #ccc

.logo
  width 192px

.pad
  padding 6px
</style>