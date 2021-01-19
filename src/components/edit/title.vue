<template lang="pug">
.title
  item-type(:type="type")
  h2(v-if="!edit") {{ text }}
    span.edit(v-if="editable", @click="edit = true")
      i.iconify(data-icon="la:pen")
  form(@submit.prevent="$emit('update', newTitle); edit = false", v-if="edit")
    input(
      ref="title",
      @blur="$emit('update', newTitle); edit = false",
      type="text",
      v-model="newTitle"
    )
  slot
</template>

<script setup lang="ts">
import { defineEmit, ref, defineProps } from "vue";

defineEmit(["update"]);
const props = defineProps({
  editable: Boolean,
  text: String,
  type: String,
});
const edit = ref(false);
const newTitle = ref(props.text);
</script>

<style lang="stylus" scoped>
.title
  width 100%
  display flex
  align-items center
  font-size 1.2em

form
  width 100%
  flex 1

input
  width 80%

.title h2
  margin 0.5em 0
</style>