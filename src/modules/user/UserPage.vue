<template>
  <article>
    <h1>{{ alias }}</h1>
    <button @click="logOut()">Log out</button>
    <router-view></router-view>
  </article>
</template>

<script>
import { user, logOut } from "../../use/user.js";
export default {
  props: {
    alias: String,
  },
  setup() {
    return {
      user,
      logOut,
    };
  },
};
</script>

<style>
</style>