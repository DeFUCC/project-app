<template lang="pug">
app-bar
router-view(v-slot="{Component}")
  transition(name="fade")
    component(:is="Component")
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Project app",
  setup() {
    return {};
  },
});
</script>

<style lang="stylus" scoped></style>
