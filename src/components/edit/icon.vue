<template lang="pug">
.icon(v-if="icon || editable", :class="{ editable }")
  img(v-if="icon", :src="icon")
  .camera(@click="edit = true", v-if="!icon || editable")
    span.iconify(data-icon="la:camera")
  edit-file(
    v-if="edit",
    @loaded="update(id, 'icon', $event.content); edit = false",
    @close="edit = false"
  )
</template>

<script lang="ts">
import { onClickOutside } from "@vueuse/core";
import { defineComponent, ref } from "vue";
import { update } from "../../store/item";

export default defineComponent({
  props: {
    id: String,
    icon: String,
    editable: Boolean,
  },
  setup() {
    const edit = ref(false);

    return {
      edit,
      update,
    };
  },
});
</script>

<style lang="stylus" scoped>
.icon img
  border-radius 5em
  transition all 300ms ease

.icon
  position relative
  margin 1em
  border-radius 5em
  background-color #eee
  display flex
  align-items center
  justify-content center
  flex 1 1 100px

.icon.editable
  cursor pointer

.icon.editable:hover img
  opacity 0.3

.camera
  position absolute
  opacity 0.5
  padding 0.5em
  font-size 1.5em
  transition all 300ms ease-in-out

.icon:hover .plus
  opacity 1

.uploader
  position absolute
</style>