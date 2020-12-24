<template>
  <router-link
    :to="'/users/' + profile.pub"
    class="user"
    :style="{
      backgroundColor: itemColor(profile.pub),
    }"
  >
    <UserAvatar size="small" :pic="profile.avatar" class="pad" />
    {{ profile.alias }}
  </router-link>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
import { gun } from "../../store/gun-db";
import { itemColor } from "../../tools/colors";

export default defineComponent({
  props: {
    avatar: String,
    alias: String,
    pub: String,
    author: String,
  },
  setup(props) {
    const profile = reactive({ ...props });

    if (props.author) {
      gun
        .user(props.author)
        .on((userIs) => {
          if (userIs) {
            profile.alias = userIs.alias;
            profile.pub = userIs.pub;
          }
        })
        .get("profile")
        .get("avatar")
        .on((d: string) => {
          profile.avatar = d;
        });
    }

    return { profile, itemColor };
  },
});
</script>

<style scoped>
.pad {
  padding-right: 0.5em;
}
.user {
  display: flex;
  align-items: center;
  border-radius: 1em;
  padding: 4px 8px 4px 4px;
}
</style>