<template lang="pug">
form.add(@submit.prevent="")
  input.title(
    ref="adder",
    placeholder="+",
    type="text",
    v-model.trim="item.title"
  )
  button(v-if="item.title", @click="addItem()")
    span ADD
</template>

<script setup >
import { createItem } from "store@item";
import { onStartTyping } from "@vueuse/core";

const emit = defineEmits(["search"]);
const props = defineProps({
  type: String,
  parent: String,
  editable: Boolean,
  collective: String,
});

const item = reactive({
  title: null,
});

const adder = ref();

watchEffect(() => {
  emit("search", item.title);
});

function addItem() {
  createItem(props.collective, props.type, item, props.parent);
  item.title = "";
}

onStartTyping(() => {
  if (!adder.value.active) adder.value.focus();
});
</script>

<style lang="stylus" scoped>
form
  display: flex
  align-items: center
  padding: 1em
  flex: 1 1 100%

.title
  margin: 0
  flex: 1 1 auto
  font-size: 1em
  outline: none
  border-radius: 1em
  background-color: var(--bar-color)
  color: var(--text-color)
  transition: all 300ms ease-in-out
</style>