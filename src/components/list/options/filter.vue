<script setup >
import { user } from "store@user";

defineEmits(["star", "seen", "trash"]);

defineProps({
  my: {
    type: Object,
    default: {
      star: true,
      seen: true,
      trash: false,
    },
    required: true,
  },
});
</script>

<template lang="pug">
.filter
  .title Filter by
  .controls.text-2xl
    button(:class="{ active: my.star }", @click="my.star = !my.star")
      .i-la-star
    button(:class="{ active: my.seen }", @click="my.seen = !my.seen")
      .i-la-eye
    button(:class="{ active: my.trash }", @click="my.trash = !my.trash")
      .i-la-trash
</template>



<style lang="stylus" scoped>
.filter
  display: flex
  flex-flow: row wrap
  padding: 0.5em
  flex: 1 1 300px

.filter button
  margin: 0
  border-radius: 0
  padding: 0.5em 0.7em

.filter button:first-child
  border-radius: 4em 0 0 4em

.filter button:last-child
  border-radius: 0 4em 4em 0

</style>