<template lang="pug">
.url
  span.title {{ $t('link') }}
  span.edit(v-if="!link", @click="edit = true")
    i.iconify(data-icon="la:plus")
  a.link(v-if="!edit && link", :href="link", target="_blank", rel="nofollow") {{ link }}
  input(
    v-if="edit",
    placeholder="https://www.frkt.ru",
    ref="editor",
    @keyup.enter="update()",
    @blur="update()",
    @keyup.esc="edit = false",
    type="url",
    v-model="newLink"
  )
  span.edit(v-if="link && editable", @click="edit = !edit")
    i.iconify(data-icon="la:pen")
  span.edit(v-if="link && editable", @click="$emit('update', null)")
    i.iconify(data-icon="la:trash")
  slot
</template>

<script setup lang="ts">
import { defineEmit, ref, defineProps } from "vue";
import { error } from "../../store/history";

const emit = defineEmit({
  update: (link) => (link ? true : false),
});
const props = defineProps({
  editable: Boolean,
  link: String,
});
const edit = ref(false);
const newLink = ref(props.link);
const editor = ref(null);
function update() {
  if (editor.value.checkValidity()) {
    emit("update", newLink.value);
  } else {
    newLink.value = props.link;
  }
  edit.value = false;
}
</script>

<style lang="stylus" scoped>
.title
  font-size 0.8em
  white-space nowrap
  color var(--text-light)

.url
  width 100%
  display flex
  align-items center
  font-size 1em

.link
  white-space nowrap
  overflow hidden
  margin 0 0.5em

input
  width 80%

.title h2
  margin 0.5em 0

.edit
  font-size 16px
  padding 6px
</style>