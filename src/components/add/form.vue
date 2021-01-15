<template lang="pug">
form.add(@submit.prevent="")
  input.title(placeholder="+", type="text", v-model.trim="add.title")
  button(v-if="add.title", @click="addItem()")
    span.iconify(data-icon="la:plus")
</template>

<script lang="ts">
import { computed, defineComponent, reactive, watchEffect } from "vue";
import { error } from "../../store/history";
import { user } from "../../store/user";
import { createItem } from "../../store/item";

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

    return {
      add,
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
  border 1px solid #aaa
  outline none
  width 1em
  transition all 300ms ease-in-out

.title:focus
  width 6em
</style>