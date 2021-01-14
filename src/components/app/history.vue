<template lang="pug">
section.notification
  transition-group(name="list", tag="div")
    .message(
      v-for="(msg, key) in unseen",
      :key="key",
      :style="{ backgroundColor: eventColors[msg.type] }"
    )
      .content {{ msg.content }}
      router-link.more(to="/history") &equiv;
</template>

<script>
import { unseen, eventColors } from "../../store/history";
export default {
  setup() {
    return {
      unseen,
      eventColors,
    };
  },
};
</script>

<style lang="stylus" scoped>
.notification
  position fixed
  bottom 2em
  left 130px
  z-index 50

.message
  font-size 0.7em
  padding 0.5em
  background-color #eee
  display flex
  flex-flow row

.more
  padding 0 0.4em
  text-decoration none

.content:first-letter
  text-transform capitalize
</style>