<template lang="pug">
router-link.card(
  :to="'/users/' + user.pub",
  :style="{ backgroundColor: itemColor(user.pub) }"
)
  h3.alias {{ user.alias }}
</template>

<script setup lang="ts">
import { computed, defineProps, reactive } from "vue";
import { itemColor } from "../../use/colors";

const props = defineProps({
  user: Object,
});
</script>

<style lang="stylus" scoped>
.card
  padding 1em
  margin 0.5em 0
  display flex
  align-items center
  background-color #eee

h3
  margin 0
</style>