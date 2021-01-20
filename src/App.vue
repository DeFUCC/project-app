<template lang="pug">
app-bar
router-view(v-slot="{Component}")
  transition(name="fade")
    component(:is="Component")
</template>

<script setup lang="ts">
</script>

<style lang="stylus" scoped></style>
