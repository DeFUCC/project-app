<template lang="pug">
.search(:class="{ open: search.text }")
  .title Search
  form
    label(for="search")
      .i-la-search
    input(type="text", v-model="search.text")
    i.close(@click.prevent.stop="search.text = ''")
      .i-la-times-circle
</template>

<script setup >
import { reactive, watch, watchEffect } from "vue";

const emit = defineEmits(["search"]);

const search = reactive({
  text: "",
  open: false,
});

watchEffect(() => {
  emit("search", search.text);
});
</script>

<style lang="stylus" scoped>
.search
  display flex
  align-items center
  display flex
  flex-flow row wrap
  padding 0.5em
  flex 1 1 300px

form
  display flex
  align-items center
  margin-left 1.2em
  position relative

.search input
  margin 0
  padding 1em 1.4em
  border-radius 4px
  text-indent 1em
  transition all 300ms ease-in-out

.search label
  z-index 10
  margin-right -1.2em

.close
  cursor pointer
  right 0.5em
  display none
  z-index 20

.open .close
  position absolute
  display block
</style>