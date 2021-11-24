<script setup >
</script>

<template lang="pug">
app-bar
router-view(v-slot="{ Component }")
  transition(name="fade")
    component(:is="Component")
</template>



