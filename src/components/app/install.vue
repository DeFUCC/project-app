<template lang="pug">
button(v-if="installable", @click="installApp()") Install the app
</template>

<script setup >
import { useInstall } from "../../use/install";
const { installable, installApp } = useInstall();
</script>

<style lang="stylus" scoped>
main
  display flex
  flex-flow row wrap

.card
  padding 1em 2em

.logo
  width 192px
</style>