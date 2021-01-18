<template lang="pug">
router-link.user(
  :to="{ path: isMe ? '/my' : `/page`, query: { id: `${appPath}/user/${profile.pub}` } }",
  :style="{ background: isMe ? pubGradient(profile.pub, 90) : 'none' }"
)
  user-avatar.avatar(size="small", :pic="profile.avatar")
  span.alias {{ profile.alias }}
    slot
</template>

<script lang="ts">
import { computed, defineComponent, reactive, watchEffect } from "vue";
import { db, gun, appPath } from "../../store/gun-db";
import { user } from "../../store/user";
import { itemColor, pubGradient } from "../../use/colors";
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
    const isMe = computed(() => profile.pub == user.is?.pub);

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

    return { profile, isMe, itemColor, appPath, user, pubGradient };
  },
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