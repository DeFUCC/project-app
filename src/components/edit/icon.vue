<template lang="pug">
.icon(v-if="icon || editable", :class="{ editable }")
  img(v-if="icon", :src="icon")
  .camera(@click="edit = true", v-if="!icon || editable")
    .i-la-camera
  edit-file(
    v-if="edit",
    @loaded="$emit('update', $event); edit = false",
    @close="edit = false"
  )
</template>

<script setup >

defineEmits(["update"]);

const props = defineProps({
  id: String,
  icon: String,
  editable: Boolean,
});
const edit = ref(false);
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
  flex 0 0 100px

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