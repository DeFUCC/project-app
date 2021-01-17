<template lang="pug">
img(:src="createAvatar(pub)", :width="size", :height="size")
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref } from "vue";
import createAvatar from "../../use/avatar";

export default defineComponent({
  props: {
    pub: String,
    size: {
      type: Number,
      default: 420,
    },
  },
  setup(props) {
    return {
      createAvatar,
    };
  },
});
</script>

<style lang="stylus" scoped>
img
  border-radius 100%
</style>