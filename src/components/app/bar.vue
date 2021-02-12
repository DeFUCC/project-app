<template lang="pug">
nav#bar(:style="{ background: pubGradient(user.is?.pub, 0) }")
  transition(name="fade")
    user-auth(v-if="auth", @close="auth = false")
  router-link.logo(to="/")
    img(src="/icons/feeds.svg", alt="")
  router-link(to="/u/")
    span.iconify(data-icon="la:users")
  router-link(to="/lab/")
    span.iconify(data-icon="la:flask", data-inline="false")

  .login(v-if="!user.is", @click="auth = !auth")
    span.iconify(data-icon="la:sign-in-alt")
  .username(v-else="")
    user-pill(:id="user.is.pub")
  .spacer
</template>

<script setup >
import { ref } from "vue";
import { user } from "store@user";
import { itemColor, pubGradient } from "use@colors";

const auth = ref(false);
</script>

<style lang="stylus" scoped>
.logo
  height: 32px
  width: 32px
  flex: 0 0 32px

nav
  grid-area: nav
  scroll-snap-align: start
  flex: 0 0 60px
  display: flex
  align-items: center
  flex-flow: column nowrap
  background-color: var(--top-bar)
  white-space: nowrap
  width: 60px

.router-link-active svg
  color: #000

.username
  transform: rotate(-90deg)

.spacer
  flex: 10 1 100px

nav a, nav > div:not(.spacer)
  padding: 1em
  cursor: pointer

a svg
  font-size: 1.4em
  color: #555
  transition: all 300ms ease

@media screen and (max-width: 500px)
  nav
    flex-flow: row nowrap
    white-space: nowrap
    width: 100%
    height: 50px
    overflow-x: scroll
    overflow-y: hidden

  .username
    writing-mode: horizontal-tb
    transform: rotate(0)
</style>