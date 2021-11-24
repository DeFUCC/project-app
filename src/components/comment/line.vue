<template lang="pug">
.comment(:key="comment.text")
  user-pill(:id="comment.author")
  .text(v-if="!edit") {{ comment.text }}
  .time(v-if="!edit") {{ format(comment.timestamp).date }}
  form
    input(v-if="edit", v-model="text")
    button.edit(
      v-if="comment.author == user.is?.pub && !edit",
      @click="edit = true"
    )
      span.iconify(data-icon="la:pen")
    button.save(
      v-if="edit",
      @click="$emit('edit', { timestamp: comment.timestamp, text: text }); edit = false"
    )
      span.iconify(data-icon="la:check")
    button.close(v-if="edit", @click="edit = false")
      span.iconify(data-icon="la:times")
</template>

<script setup >
import { user } from "store@user";
import { format } from "use@locale";

defineEmits({
  edit: (comment) => comment.timestamp && comment.text,
});

const props = defineProps({
  comment: Object,
});

const edit = ref(false);
const text = props.comment.text;
</script>

<style lang="stylus" scoped>
.comment
  padding: 0.5em
  background-color: var(--bar-color)
  border-radius: 1em
  margin: 0.5em
  position: relative
  line-height: 1.5em
  display: flex
  flex-flow: row wrap
  align-items: center

.text
  padding: 0 0.5em

.time
  font-size: 0.8em
  color: #999
  position: absolute
  right: 0.8em
  top: 1.2em

form
  display: flex
  flex: 1
  padding: 0 1em

input
  flex: 1
</style>