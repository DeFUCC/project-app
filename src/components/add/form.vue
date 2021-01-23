<template lang="pug">
form.add(@submit.prevent="")
  input.title(
    ref="adder",
    placeholder="+",
    type="text",
    v-model.trim="item.title"
  )
  button(v-if="item.title", @click="addItem()")
    span.iconify(data-icon="la:plus")
</template>

<script setup lang="ts">
import { defineEmit, reactive, defineProps, ref, watchEffect } from "vue";
import { createItem } from "../../store/item";
import { onStartTyping } from "@vueuse/core";

const emit = defineEmit(["search"]);
const props = defineProps({
  type: String,
  parent: String,
  editable: Boolean,
});

const item = reactive({
  title: null,
});

const adder = ref();

watchEffect(() => {
  emit("search", item.title);
});

function addItem() {
  createItem(props.type, item, props.parent);
  item.title = "";
}

onStartTyping(() => {
  if (!adder.value.active) adder.value.focus();
});
</script>

<style lang="stylus" scoped>
form
  display flex
  align-items center
  padding 1em
  flex 1 1 600px

.title
  margin 0
  flex 1 0
  font-size 1em
  outline none
  background-color var(--button-secondary)
  color var(--text-color)
  width 1em
  transition all 300ms ease-in-out

.title:focus
  width 6em
</style>