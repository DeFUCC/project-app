<template lang="pug">
img.avatar(
  v-if="pic",
  :src="pic",
  :class="{ [size]: true }",
  :alt="user.is.alias"
)
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

<style lang="stylus" scoped>
.avatar
  border-radius 8em

.small
  width 1.5em
  height 1.5em

.medium
  width 4em
  height 4em

.big
  width 8em
  height 8em
</style>