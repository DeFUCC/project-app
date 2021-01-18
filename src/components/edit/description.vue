<template lang="pug">
.description(v-if="text || editable")
  .title Short Description
    button.edit(
      @click="editor.open = !editor.open",
      v-if="editable && !editor.open"
    )
      i.iconify(data-icon="la:pen-alt")
    button.save(v-if="editor.open", @click="update()")
      i.iconify(data-icon="la:check")
    button(v-if="editor.open", @click="editor.open = false")
      i.iconify(data-icon="la:times")
  .markdown(v-if="!editor.open") {{ text }}
  form(v-if="editor.open", @submit.prevent="")
    textarea(
      v-model="editor.text",
      name="description",
      @keyup.enter.meta="update()",
      @keyup.ctrl.enter="update()",
      :rows="10"
    )
</template>

<script lang="ts">
import { defineComponent, reactive, ref, watchEffect } from "vue";

import { linkify } from "remarkable/linkify";

export default defineComponent({
  emits: ["update"],
  props: {
    text: String,
    id: String,
    editable: Boolean,
  },
  setup(props, context) {
    const editor = reactive({
      text: "",
      open: false,
    });

    watchEffect(() => {
      editor.text = props.text;
    });

    function update() {
      context.emit("update", editor.text);
      editor.open = false;
    }

    return {
      update,
      editor,
    };
  },
});
</script>

<style lang="stylus" scoped>
.title
  font-size 0.8em
  padding 0.5em 0
  color var(--text-light)

.edit
  cursor pointer
  padding 8px
  border-radius 4em
  color var(--text-color)

.edit:hover
  opacity 1

.description
  margin 1em 0
  position relative
  hyphens auto
  min-height 4em

textarea
  width 90%
</style>