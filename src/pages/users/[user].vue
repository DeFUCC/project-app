<template lang="pug">
.user
  .profile {{ user }}
</template>

<script setup lang="ts">
import { defineProps } from "vue";

const props = defineProps({
  user: String,
});
</script>

<style lang="stylus" scoped></style>