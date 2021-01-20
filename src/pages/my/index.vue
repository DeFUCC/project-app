<template lang="pug">
#profile
  aside
    edit-icon(
      :id="`${appPath}/user/${user?.is?.pub}`",
      :editable="true",
      :icon="user?.info?.icon"
    )
  main
    h1 {{ user.info.title }}
    button(v-if="!published", @click="publishUser()") Publish
    user-pub(:pub="user.is?.pub", :size="120")
</template>

<script setup lang="ts">
import { defineProps, ref } from "vue";
import { appPath, db } from "../../store/gun-db";
import { user, publishUser } from "../../store/user";

const props = defineProps({
  alias: String,
});
const published = ref(false);
db.get("user")
  .get(user.is?.pub)
  .once((val) => {
    published.value = val;
  });
</script>

<style lang="stylus" scoped>
#profile
  padding 1em
  display grid
  grid-template-columns 200px 1fr

aside div
  margin 1em
</style>