<template lang="pug">
form.add(@submit.prevent="")
  input.title(
    ref="adder",
    placeholder="+",
    type="text",
    v-model.trim="add.title"
  )
  button(v-if="add.title", @click="addItem()")
    span.iconify(data-icon="la:plus")
</template>

<script lang="ts">
import { computed, defineComponent, reactive, ref, watchEffect } from "vue";
import { error } from "../../store/history";
import { user } from "../../store/user";
import { createItem } from "../../store/item";
import { onStartTyping } from "@vueuse/core";

export default defineComponent({
  emits: ["search"],
  props: {
    type: String,
    parent: String,
    editable: Boolean,
  },
  setup(props, { emit }) {
    const add = reactive({
      title: null,
    });

    watchEffect(() => {
      emit("search", add.title);
    });

    function addItem() {
      createItem(props.type, add, props.parent);
      add.title = "";
    }

    const adder = ref();

    onStartTyping(() => {
      if (!adder.value.active) adder.value.focus();
    });

    return {
      add,
      adder,
      addItem,
    };
  },
});
</script>

<style lang="stylus" scoped>
form
  display flex
  align-items center
  padding 1em

.title
  margin 0
  flex 1 0
  font-size 1em
  outline none
  background-color var(--secondary-button)
  color var(--text-color)
  width 1em
  transition all 300ms ease-in-out

.title:focus
  width 6em
</style>