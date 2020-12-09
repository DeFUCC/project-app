<template>
  <UserAvatar size="small" :pic="author.avatar" />
  <div>{{ author.alias }}</div>
</template>

<script>
import UserAvatar from "../user/UserAvatar.vue";
export default {
  components: {
    UserAvatar,
  },
  props: {
    author: Object,
  },
  setup() {
    return {};
  },
};
</script>

<style>
.avatar-small {
  height: 1.5em;
  border-radius: 2em;
}
</style>