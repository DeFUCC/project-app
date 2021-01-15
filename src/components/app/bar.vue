<template lang="pug">
nav#bar(
  :class="{ open }",
  @click="toggle()",
  :style="{ background: pubGradient(user.is?.pub, 0) }"
)
  router-link.logo(to="/design")
    img(src="/icons/feeds.svg", alt="")
  .spacer
  router-link(v-if="!user.is", to="/auth")
    span.iconify(data-icon="la:sign-in-alt")
  router-link.username(v-else="", to="/my")
    user-pill(:id="user.is.pub")
  .spacer
  router-link(to="/")
    span.iconify(data-icon="la:home", data-inline="false")
  app-locale
  router-link(to="/about/")
    span.iconify(data-icon="la:info-circle")
  router-link(to="/graph/")
    span.iconify(data-icon="mdi:graph-outline", data-inline="false")
</template>

<script>
import { ref } from "vue";
import { user } from "../../store/user";
import { itemColor, pubGradient } from "../../use/colors";
export default {
  name: "AppBar",
  setup() {
    const open = ref(false);
    function toggle() {
      open.value = !open.value;
    }

    return {
      open,
      toggle,
      user,
      itemColor,
      pubGradient,
    };
  },
};
</script>

<style lang="stylus" scoped>
.logo
  height 32px
  width 32px
  flex 0 0 32px

nav
  scroll-snap-align start
  flex 0 0 60px
  display flex
  align-items center
  flex-flow column nowrap
  background-color var(--top-bar)
  white-space nowrap
  width 60px

.router-link-active svg
  color #000

.username
  transform rotate(-90deg)

.spacer
  flex 10 1 100px

nav a
  padding 1em

a svg
  font-size 1.4em
  color #555
  transition all 300ms ease

@media screen and (max-width 500px)
  nav
    position fixed
    z-index 100
    bottom 0
    display flex
    align-items center
    flex-flow row nowrap
    background-color var(--top-bar)
    white-space nowrap
    width 100%
    height 50px

  .username
    writing-mode horizontal-tb
    transform rotate(0)
</style>