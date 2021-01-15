<template lang="pug">
.filter(v-if="user.is", :style="{ backgroundColor: itemColor(user.is.pub) }")
  button(:class="{ active: my.star }", @click="$emit('star')")
    span.iconify(data-icon="la:star")
  button(:class="{ active: my.seen }", @click="$emit('seen')")
    span.iconify(data-icon="la:eye")
  button(:class="{ active: my.trash }", @click="$emit('trash')")
    span.iconify(data-icon="la:trash")
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { user } from "../../../store/user";
import { itemColor } from "../../../use/colors";

export default defineComponent({
  emits: ["star", "seen", "trash"],
  props: {
    my: {
      type: Object,
      default: {
        star: true,
        seen: true,
        trash: false,
      },
      required: true,
    },
  },
  setup() {
    return {
      user,
      itemColor,
    };
  },
});
</script>

<style lang="stylus" scoped>
.filter
  display flex
  margin 0 0.5em
  padding 4px
  border 1px solid #777
  border-radius 4em

.filter button
  margin 0
  border-radius 0
  padding 0.5em 0.7em

.filter button:first-child
  border-radius 4em 0 0 4em

.filter button:last-child
  border-radius 0 4em 4em 0

.iconify
  font-size 1.4em
</style>