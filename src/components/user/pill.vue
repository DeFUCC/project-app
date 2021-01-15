<template lang="pug">
router-link.user(
  :to="{ path: profile.pub != user.is?.pub ? `${appPath}/user` : '/my', query: { 0: profile.pub } }"
)
  user-avatar.pad(size="small", :pic="profile.avatar")
  span.alias(:style="{ borderColor: itemColor(profile.pub) }") {{ profile.alias }}
    slot
</template>

<script lang="ts">
import { defineComponent, reactive, watchEffect } from "vue";
import { db, gun, appPath } from "../../store/gun-db";
import { user } from "../../store/user";
import { itemColor } from "../../use/colors";
import { truncate } from "../../store/item";

export default defineComponent({
  props: {
    id: String,
  },
  setup(props) {
    const profile = reactive({
      alias: null,
      pub: null,
      avatar: null,
    });

    watchEffect(() => {
      if (props.id) {
        db.get("user")
          .get(props.id)
          .on((data, key) => {
            profile.alias = truncate(String(data.alias), 24);
            profile.pub = data.pub;
            profile.avatar = data.icon;
          });
      }
    });

    return { profile, itemColor, appPath, user };
  },
});
</script>

<style lang="stylus" scoped>
.pad
  padding 0.5em

.user
  display flex
  align-items center
  border-radius 1em
  padding 4px
  white-space nowrap
</style>