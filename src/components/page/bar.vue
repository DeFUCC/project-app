<template lang="pug">
aside.row(:style="{ backgroundColor: itemColor(id) }")
  item-route(:id="parent || id", @open="$emit('open', $event)")
  router-link.link(:to="{ path: '/page', query: { id: id } }")
    i.iconify(data-icon="la:link")
  .spacer
  span.close(@click="$emit('close')")
    span.iconify(data-icon="la:times")
</template>

<script setup >
import {  defineProps } from "vue";
import { itemColor } from "use@colors";

defineProps({
  id: String,
  parent: String,
});

defineEmits(["close", "open"]);
</script>

<style lang="stylus" scoped>
.row
  display: flex
  align-items: center
  position: sticky
  top: 0
  z-index: 30
  font-size: 14px
  min-height: 32px

.link
  margin: 0 1em

.close
  padding: 8px 16px
  cursor: pointer
</style>