<template lang="pug">
router-view(v-slot="{ Component }")
  transition(name="fade")
    component(:is="Component")
</template>

<script lang="ts">
export default {
  props: {
    type: String,
  },
  setup() {
    return {};
  },
};
</script>

<style lang="stylus" scoped></style>