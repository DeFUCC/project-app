<template lang="pug">
main.page
  header.bar(:style="{ background: pubGradient(user.is?.pub, -90) }")
    user-avatar(:pic="user?.profile?.icon", size="medium")
    router-link.title(to="/my") {{ user?.profile?.title }}
    router-link(to="/my/profile") Profile
    router-link(to="/my/stars") Stars
    .spacer
    button(@click="logOut()") Log out
  router-view(v-slot="{ Component }")
    transition(name="fade")
      keep-alive
        component(:is="Component", :user="user.is?.pub")
</template>

<script setup >
import { pubGradient } from "use@colors";
import { user, logOut } from "store@user";
import { onMounted } from "vue";

import { useTitle } from "@vueuse/core";

useTitle(user.profile.title);
</script>

<style lang="stylus" scoped>
.bar
  display: flex
  position: sticky
  z-index: 20
  top: 0
  flex-flow: row nowrap
  align-items: center
  justify-content: flex-start
  padding: 1em
  background-color: var(--bar-color)

.bar a
  padding: 1em

.page
  width: 100%

.title
  padding: 0 1em
  font-size: 1.2em
  font-weight: bold
</style>