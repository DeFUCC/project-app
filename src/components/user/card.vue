<template>
  <router-link
    :to="'/app/users/' + user.pub"
    class="card"
    :style="{
      backgroundColor: itemColor(user.pub),
    }"
  >
    <UserAvatar size="small" :pic="profile.icon" />
    <h3 class="alias">{{ user.alias }}</h3>
  </router-link>
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