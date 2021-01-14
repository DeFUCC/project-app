<template lang="pug">
aside.row(:style="{ backgroundColor: itemColor(id) }")
  item-route(:id="id", @open="$emit('open', $event)")
  .spacer
  span.close(@click="$emit('close')")
    span.iconify(data-icon="la:times")
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { itemColor } from "../../use/colors";

export default defineComponent({
  emits: ["close", "open"],
  props: {
    id: String,
  },
  setup() {
    return {
      itemColor,
    };
  },
});
</script>

<style lang="stylus" scoped>
.row
  display flex
  align-items center
  position sticky
  top 0
  z-index 30
  font-size 14px
  min-height 32px

.close
  padding 8px 16px
  cursor pointer
</style>