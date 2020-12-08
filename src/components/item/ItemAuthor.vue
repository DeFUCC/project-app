<template>
  <div class="info" v-if="author">
    <img
      v-if="author.avatar"
      class="avatar-small"
      :src="author.avatar"
      alt=""
    />
    {{ author.alias }}
  </div>
</template>

<script>
export default {
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