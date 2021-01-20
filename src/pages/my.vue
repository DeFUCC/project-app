<template lang="pug">
main.page(v-if="user.is")
  header.bar(:style="{ background: pubGradient(user.is?.pub, -90) }")
    user-avatar(:pic="user?.info?.icon", size="medium")
    .title {{ user.is?.alias }}
    .spacer
    button(@click="logOut()") Log out
  .bar
    router-link(to="/my") Profile
    router-link(to="/my/stars") Stars
  router-view(v-slot="{ Component }")
    transition(name="fade")
      keep-alive
        component(:is="Component", :user="user.is.pub")
</template>

<script setup lang="ts">
import { pubGradient } from "../use/colors";
import { user, logOut } from "../store/user";
import { useRouter } from "vue-router";
import { watchEffect } from "vue";

const router = useRouter();
watchEffect(() => {
  if (!user.is) {
    router.push("/");
  }
});
</script>

<style lang="stylus" scoped>
.bar
  display flex
  position sticky
  z-index 20
  top 0
  flex-flow row nowrap
  align-items center
  justify-content flex-start
  padding 1em
  background-color var(--bar-color)

.bar a
  padding 1em

.page
  width 100%

.title
  padding 0 1em
  font-size 1.2em
  font-weight bold
</style>