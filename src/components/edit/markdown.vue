<template lang="pug">
.description(v-if="text || editable")
  .title 
    slot {{ $t('description') }}
    button.edit(@click="open = !open", v-if="editable && !open")
      .i-la-pen-alt
    button.save(v-if="open", @click="update()")
      .i-la-check
    button(v-if="open", @click="open = false")
      .i-la-times
  .markdown(v-if="!open", v-html="md.render(text || '')")
  form(v-if="open", @submit.prevent="")
    textarea(
      v-model="text",
      name="description",
      @keyup.enter.meta="update()",
      @keyup.ctrl.enter="update()",
      :rows="10"
    )
</template>

<script setup >
import { ref, defineProps, reactive, watchEffect } from "vue";
import markdownIt from "markdown-it";
import mila from "markdown-it-link-attributes";

const md = markdownIt({
  linkify: true,
  typographer: true,
});

md.use(mila, {
  attrs: {
    target: "_blank",
    rel: "noopener",
  },
});

const emit = defineEmits(["update"]);

const props = defineProps({
  text: String,
  id: String,
  editable: Boolean,
});

const text = ref("");
const open = ref(false);

watchEffect(() => {
  text.value = props.text;
});

function update() {
  emit("update", text.value);
  open.value = false;
}
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
  margin 0.5em
  position relative
  hyphens auto
  min-height 4em

textarea
  width 90%
</style>