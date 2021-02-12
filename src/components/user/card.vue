<template lang="pug">
router-link.card(
  :to="'/u/' + id",
  :style="{ background: pubGradient(profile?.pub, -90) }"
)
  user-avatar(v-if="profile?.avatar", :pic="profile?.avatar", size="medium")
  user-pub(v-else, :pub="profile?.pub", :size="60")
  .profile
    .title {{ profile?.title }}
    slot 
</template>

<script setup >
import { asyncComputed } from "@vueuse/core";
import { computed, defineProps, reactive } from "vue";
import { appPath, db, getShortHash, sea } from "store@gun-db";
import { itemColor, pubGradient } from "use@colors";

const props = defineProps({
  profile: Object,
  id: String,
});

function remove(id) {
  console.log(id);
  db.get("user").get(id).put(null);
}
</script>

<style lang="stylus" scoped>
.card
  padding: 1em
  margin: 0.5em 0
  display: flex
  align-items: center
  background-color: #eee

.profile
  margin: 1em
</style>