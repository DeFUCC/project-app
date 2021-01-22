<template lang="pug">
router-link.user(
  :to="{ path: isMe ? '/my' : `/users/${profile.id}` }",
  :style="{ background: isMe ? pubGradient(profile.pub, 90) : 'none' }"
)
  user-avatar.avatar(size="small", :pic="profile.avatar")
  span.alias {{ profile.alias }}
    slot
</template>

<script setup lang="ts">
import { computed, defineProps, reactive, watchEffect } from "vue";
import { db, appPath, gun, getShortHash } from "../../store/gun-db";
import { user } from "../../store/user";
import { pubGradient } from "../../use/colors";
import { truncate } from "../../store/item";

const props = defineProps({
  id: String,
});
const profile = reactive({
  alias: null,
  pub: null,
  avatar: null,
  id: null,
});
const isMe = computed(() => profile.pub == user.is?.pub);

watchEffect(() => {
  if (props.id) {
    gun
      .get(`~${props.id}`)
      .get(appPath)
      .get("profile")
      .on(async (data, key) => {
        profile.alias = data.title;
        profile.pub = data.pub;
        profile.avatar = data.avatar;
        profile.id = await getShortHash(props.id);
      });
  }
});
</script>

<style lang="stylus" scoped>
.avatar
  margin-top 2px

.alias
  margin 0 8px 0 6px
  font-weight normal

.user
  display flex
  align-items center
  border-radius 2em
  padding 0
  white-space nowrap
  opacity 0.75

.user:hover
  opacity 0.9
</style>