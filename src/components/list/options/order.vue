<script setup >
defineProps({
  by: { type: String, required: true, },
});

defineEmits(["order"]);

const open = ref(false);
</script>

<template lang="pug">
.order
  .title Order by
  button(:class="{ active: by == 'AB' }", @click="$emit('order', 'AB')")
    .i-la-sort-alpha-down
  button(
    :class="{ active: by == 'createdAt' }",
    @click="$emit('order', 'createdAt')"
  )
    .i-la-sort-numeric-up-alt
  button(
    :class="{ active: by == 'rating' }",
    @click="$emit('order', 'rating')"
  )
    .la-sort-amount-up-solid
</template>



<style lang="stylus" scoped>
.order
  display flex
  flex-flow row wrap
  padding 0.5em
  flex 1 1 300px

.order button
  margin 0 4px
  padding 0.5em


button
  transition all 300ms ease-in-out
</style>