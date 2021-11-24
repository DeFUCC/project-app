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

<template lang="pug">
.comment.p-2.my-2.flex.relative.items-center.flex-row.flex-wrap.rounded-xl(:key="comment.text")
  user-pill(:id="comment.author")
  .p-1(v-if="!edit") {{ comment.text }}
  .time(v-if="!edit") {{ format(comment.timestamp).date }}
  form
    input(v-if="edit", v-model="text")
    button.edit(
      v-if="comment.author == user.is?.pub && !edit",
      @click="edit = true"
    )
      .i-la-pen
    button.m-2(
      v-if="edit",
      @click="$emit('edit', { timestamp: comment.timestamp, text: text }); edit = false"
    )
      .i-la-check
    button.m-2(v-if="edit", @click="edit = false")
      .i-la-times
</template>



<style lang="stylus" scoped>
.comment
  background-color: var(--bar-color)

.time
  font-size: 0.8em
  color: #999
  position: absolute
  right: 0.8em
  top: 30%

form
  display: flex
  flex: 1
  padding: 0 1em

input
  flex: 1
</style>