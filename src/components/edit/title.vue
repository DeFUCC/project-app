<template lang="pug">
.title
  icon-type(:type="type")
  h3(v-if="!edit") {{ text }}
    span.edit(v-if="editable", @click="edit = true")
      i.iconify(data-icon="la:pen")
  form(@submit.prevent="$emit('update', newTitle); edit = false", v-if="edit")
    input(
      ref="title",
      @blur="$emit('update', newTitle); edit = false",
      type="text",
      v-model="newTitle"
    )
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  props: {
    editable: Boolean,
    text: String,
    type: String,
  },
  setup(props) {
    const edit = ref(false);
    const newTitle = ref(props.text);
    return {
      edit,
      newTitle,
    };
  },
});
</script>

<style lang="stylus" scoped></style>