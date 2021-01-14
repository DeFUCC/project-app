<template lang="pug">
router-link.card(
  :to="'/app/users/' + user.pub",
  :style="{ backgroundColor: itemColor(user.pub) }"
)
  user-avatar(size="small", :pic="profile.icon")
  h3.alias {{ user.alias }}
</template>

<script>
import { computed, reactive } from "vue";
import { useUserProfile } from "../../use/userProfile";
import { itemColor } from "../../use/colors";
export default {
  props: ["user"],
  setup(props) {
    const profile = useUserProfile(props.user.pub);

    return {
      profile,
      itemColor,
    };
  },
};
</script>

<style lang="stylus" scoped>
.card
  padding 1em
  margin 0.5em 0
  display flex
  align-items center
  background-color #eee

h3
  margin 0
</style>