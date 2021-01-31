<template lang="pug">
.order
  .title Order by
  button(:class="{ active: by == 'AB' }", @click="$emit('order', 'AB')")
    span.iconify(data-icon="la:sort-alpha-down")
  button(
    :class="{ active: by == 'createdAt' }",
    @click="$emit('order', 'createdAt')"
  )
    span.iconify(data-icon="la:sort-numeric-up-alt")
  button(
    :class="{ active: by == 'rating' }",
    @click="$emit('order', 'rating')"
  )
    span.iconify(data-icon="la:sort-amount-up-solid")
</template>

<script setup >
import { defineEmit, ref, defineProps } from "vue";

defineProps({
  by: {
    type: String,
    required: true,
  },
});

defineEmit(["order"]);

const open = ref(false);
</script>

<style lang="stylus" scoped>
.order
  display flex
  flex-flow row wrap
  padding 0.5em
  flex 1 1 300px

.order button
  margin 0 4px
  padding 0.5em

.iconify
  font-size 1.4em

button
  transition all 300ms ease-in-out
</style>