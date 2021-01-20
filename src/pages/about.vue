<template lang="pug">
main.markdown
  router-view(v-slot="{ Component }")
    transition(name="fade")
      component(:is="Component")
</template>

<script setup lang="ts">
</script>

<style lang="stylus" scoped>
.bar
  padding 1em
  background-color #333
  color #eee

.markdown
  padding 1em 2em
  max-width 620px
</style>