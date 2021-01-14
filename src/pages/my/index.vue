<template lang="pug">
#profile
  h1 {{ user.info.title }}
  button(v-if="!published", @click="publishUser()") Publish
  user-avatar(:pic="user?.info?.icon", size="big")
</template>



<script lang="ts">
import { ref } from "vue";
import { db } from "../../store/gun-db";
import { user, publishUser } from "../../store/user";

export default {
  props: {
    alias: String,
  },
  setup(props) {
    const published = ref(false);
    db.get("user")
      .get(user.is?.pub)
      .once((val) => {
        published.value = val;
      });
    return {
      publishUser,
      published,
      user,
    };
  },
};
</script>

<style lang="stylus" scoped>
#profile
  padding 1em
</style>