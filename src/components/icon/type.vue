<template lang="pug">
img.type-icon(v-if="type", :src="'/svg/' + type + '.svg'", alt="")
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    type: {
      type: String,
      default: "skill",
    },
  },
  setup() {
    return {};
  },
});
</script>

<style lang="stylus" scoped>
.type-icon
  width 1.5em
  color #999
</style>