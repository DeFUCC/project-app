<template lang="pug">
main route
  router-view(v-slot="{ Component }")
    transition(name="fade")
      keep-alive
        component(:is="Component")
</template>

<script setup lang="ts">
</script>

<style lang="stylus" scoped></style>