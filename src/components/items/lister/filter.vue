<template lang="pug">
.filter(v-if="user.is")
  .title Filter by
  .controls
    button(:class="{ active: my.star }", @click="my.star = !my.star")
      span.iconify(data-icon="la:star")
    button(:class="{ active: my.seen }", @click="my.seen = !my.seen")
      span.iconify(data-icon="la:eye")
    button(:class="{ active: my.trash }", @click="my.trash = !my.trash")
      span.iconify(data-icon="la:trash") 
</template>

<script setup lang="ts">
import { defineComponent, defineEmit, defineProps } from "vue";
import { user } from "../../../store/user";

defineEmit(["star", "seen", "trash"]);

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

<style lang="stylus" scoped>
.filter
  display flex
  padding 0

.filter button
  margin 0
  border-radius 0
  padding 0.5em 0.7em

.filter button:first-child
  border-radius 4em 0 0 4em

.filter button:last-child
  border-radius 0 4em 4em 0

.iconify
  font-size 1.4em
</style>