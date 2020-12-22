<template>
  <div
    class="user"
    :style="{
      backgroundColor: itemColor(pub),
    }"
  >
    <UserAvatar size="small" :pic="avatar" />&nbsp;
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
.user {
  display: flex;
  align-items: center;
  border-radius: 1em;
  padding: 4px;
}
</style>