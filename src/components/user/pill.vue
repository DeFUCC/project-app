<template>
  <div
    class="user"
    :style="{
      backgroundColor: itemColor(pub),
    }"
  >
    <UserAvatar size="small" :pic="avatar" class="pad" />
    {{ alias }}
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { itemColor } from "../../tools/colors";

export default defineComponent({
  props: {
    avatar: {
      type: String,
    },
    alias: {
      type: String,
    },
    pub: {
      type: String,
    },
  },
  setup() {
    return { itemColor };
  },
});
</script>

<style scoped>
.pad {
  padding-right: 0.5em;
}
.user {
  display: flex;
  align-items: center;
  border-radius: 1em;
  padding: 4px 8px 4px 4px;
}
</style>