<template>
  <router-link
    :to="'/users/' + user.pub"
    class="card"
    :style="{
      backgroundColor: itemColor(user.pub),
    }"
  >
    <UserAvatar size="small" :pic="profile.avatar" />
    <h3 class="alias">{{ user.alias }}</h3>
  </router-link>
</template>

<script>
import { computed, reactive } from "vue";
import { useUserProfile } from "../../use/userProfile";
import { itemColor } from "../../tools/colors";
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

<style scoped>
.card {
  padding: 1em;
  margin: 0.5em 0;
  display: flex;
  align-items: center;
  background-color: #eee;
}
h3 {
  margin: 0;
}
</style>