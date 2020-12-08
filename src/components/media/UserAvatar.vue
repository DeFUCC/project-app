<template>
  <div class="avatar">
    <img
      class="avatar"
      v-if="pic"
      :src="pic"
      :class="{ [size]: true }"
      :alt="user.is.alias"
    />
  </div>
</template>

<script>
export default {
  props: {
    pic: String,
    size: {
      type: String,
      default: "small",
    },
    user: {
      type: Object,
      default: {
        is: {
          alias: "No alias",
        },
      },
    },
  },
};
</script>

<style>
.avatar {
  border-radius: 8em;
}

.avatar.small {
  width: 1.5em;
  height: 1.5em;
}

.avatar.medium {
  width: 4em;
  height: 4em;
}
</style>