<template lang="pug">
#profile
  aside
    edit-icon(
      @update="updateProfile('avatar', $event.content)",
      :editable="true",
      :icon="user?.profile?.avatar"
    )
    edit-title(
      :editable="Boolean(user.is)",
      :text="user.profile.title",
      @update="updateProfile('title', $event)"
    )
    user-pub(:pub="user.is?.pub", :size="120")
  main
    button(@click="participate()") Participate
    .data 
      .line(v-for="(u, k) in user.profile", :key="k") {{ k }}: {{ u }}
</template>

<script setup >
import { defineProps, onMounted, ref } from "vue";
import { appPath, db, gun } from "store@gun-db";
import { notify } from "store@history";
import { update } from "store@item";
import { user, participate } from "store@user";

const props = defineProps({
  alias: String,
});
const published = ref(false);
db.get("user")
  .get(user.is?.pub)
  .once((val) => {
    published.value = val;
  });

function updateProfile(field, content) {
  const userProfile = gun.user(user.is.pub).get(appPath).get("profile");
  userProfile.get(field).put(content);
  userProfile.get("updatedAt").put(Date.now());
  userProfile.get("log").get(Date.now()).put(`new ${field}`);
  notify(`You've updated ${field}!`);
}
</script>

<style lang="stylus" scoped>
#profile
  padding: 1em
  display: grid
  grid-template-columns: 200px 1fr

aside div
  margin: 1em

.line
  padding: 1em
</style>