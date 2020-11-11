<template>
  <article>Userinfo</article>

  {{ user.is?.alias }}
</template>

<script>
import { user } from "../../use/user.js";
export default {
  props: {
    alias: String,
  },
  setup() {
    return {
      user,
    };
  },
};
</script>

<style>
</style>