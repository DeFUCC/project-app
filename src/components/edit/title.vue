<template lang="pug">
.title
  h3(v-if="!edit") {{ text }}
    span.edit(v-if="editable", @click="edit = true")
      i.iconify(data-icon="la:pen")
  input(
    v-else,
    ref="title",
    @keyup.enter="$emit('update', $event.target.value); edit = false",
    @blur="edit = false",
    @keyup.esc="edit = false",
    type="text",
    :value="text"
  )
</template>

<script setup lang="ts">
import { defineEmit, ref, defineProps } from "vue";

defineEmit(["update"]);
const props = defineProps({
  editable: Boolean,
  text: String,
});
const edit = ref(false);
</script>

<style lang="stylus" scoped>
.title
  width 100%
  display flex
  align-items center

form
  width 100%
  flex 1
  height 3em

input
  width 80%

.title h3
  margin 0.5em 0
  font-size 1.2em

.edit
  font-size 16px
  padding 6px
</style>