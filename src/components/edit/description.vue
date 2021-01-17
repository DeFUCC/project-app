<template lang="pug">
.description(v-if="md || editable")
  .title Short Description
    button.edit(
      @click="editor.open = !editor.open",
      v-if="editable && !editor.open"
    )
      i.iconify(data-icon="la:pen-alt")
    button.save(v-if="editor.open", @click="update()")
      i.iconify(data-icon="la:check")
    button(v-if="editor.open")
      i.iconify(data-icon="la:times")
  .markdown(v-if="!editor.open", v-html="md")
  form(v-if="editor.open", @submit.prevent="")
    textarea(
      v-model="editor.text",
      name="description",
      @keyup.enter.meta="update()",
      @keyup.ctrl.enter="update()",
      :cols="30",
      :rows="10"
    )
</template>

<script lang="ts">
import { defineComponent, reactive, ref, watchEffect } from "vue";
import { Remarkable } from "remarkable";
import { linkify } from "remarkable/linkify";

export default defineComponent({
  emits: ["update"],
  props: {
    text: String,
    id: String,
    editable: Boolean,
  },
  setup(props, context) {
    const md = ref("");
    const editor = reactive({
      text: "",
      open: false,
    });
    //  const parser = new Remarkable().use(linkify);
    watchEffect(() => {
      //    md.value = parser.render(props.text);
      md.value = props.text;
      editor.text = props.text;
    });

    function update() {
      context.emit("update", editor.text);
      editor.open = false;
    }

    return {
      update,
      md,
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
  margin 0 2em
  position relative
  hyphens auto
  min-height 4em
</style>