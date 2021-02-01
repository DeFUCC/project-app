<template lang="pug">
main Designs
  router-view(v-slot="{ Component }")
    transition(name="fade")
      component(:is="Component")
</template>

<script setup>
</script>

<style lang="stylus" scoped></style>