<template lang="pug">
main
  qr-stream(:camera="camera") SCAN THE CODE
  button(@click="camera = 'front'") SCAN
</template>

<script setup>
import { ref } from "vue";
import { QrStream, QrCapture, QrDropzone } from "vue3-qr-reader";
const camera = ref("off");
</script>

<style lang="stylus" scoped></style>