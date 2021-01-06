<template>
  <div class="description">
    <div class="edit" @click="editor.open = !editor.open" v-if="editable">
      <span v-if="!editor.open">
        <i class="iconify" data-icon="la:pen-alt"></i>
      </span>
      <span v-if="editor.open">
        <i class="iconify" data-icon="la:times"></i>
      </span>
    </div>
    <div v-if="!editor.open" class="markdown" v-html="md"></div>
    <form v-if="editable && editor.open" @submit.prevent>
      <textarea
        v-model="editor.text"
        name="description"
        @keyup.enter.meta="
          $emit('update', editor.text);
          editor.open = false;
        "
        @keyup.ctrl.enter="
          $emit('update', editor.text);
          editor.open = false;
        "
        cols="30"
        rows="10"
      ></textarea>
      <button
        @click="
          $emit('update', editor.text);
          editor.open = false;
        "
        class="save"
      >
        Save
      </button>
    </form>
  </div>
  <section></section>
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
  setup(props) {
    const md = ref("");
    const editor = reactive({
      text: "",
      open: false,
    });
    const parser = new Remarkable().use(linkify);
    watchEffect(() => {
      md.value = parser.render(props.text);
      editor.text = props.text;
    });

    return {
      md,
      editor,
    };
  },
});
</script>

<style scoped>
.edit {
  cursor: pointer;
  opacity: 0.7;
  padding: 4px 8px;
  background-color: hsla(0, 0%, 80%, 0.6);
  border-radius: 4em;
}
.edit:hover {
  opacity: 1;
}
.description {
  margin: 0 2em;
  position: relative;
  hyphens: auto;
  min-height: 4em;
}

.description .edit {
  font-size: 1.4em;
  position: absolute;
  right: 0;
}
</style>