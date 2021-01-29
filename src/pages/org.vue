<template lang="pug">
router-view(v-slot="{ Component }")
  transition(name="fade")
    component(:is="Component")
</template>

<script setup lang="ts">
</script>

<style lang="stylus" scoped>
.title
  padding 0.5em
  background-color var(--top-bar)
</style>