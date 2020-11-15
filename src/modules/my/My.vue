<template>
  <article v-if="user.is">
    <header class="bar" :style="{ backgroundColor: itemColor(user.is?.pub) }">
      <img
        class="avatar"
        v-if="user.avatar"
        :src="user.avatar"
        :alt="user.is?.alias"
      />
      <div class="title">{{ user.is?.alias }}</div>
      <div class="spacer"></div>
      <button @click="logOut()">🚪 Log out</button>
    </header>
    <div class="bar">
      <router-link to="/my/profile">Profile</router-link>
    </div>

    <router-view></router-view>
  </article>
</template>

<script>
import { itemColor } from "../../use/colors.js";
import { useUser } from "../../use/useUser.js";
import { useRouter } from "vue-router";
import { watchEffect } from "vue";
export default {
  setup() {
    const { user, logOut } = useUser();
    const router = useRouter();
    watchEffect(() => {
      if (!user.is) {
        router.push("/");
      }
    });

    return {
      user,
      logOut,
      itemColor,
    };
  },
};
</script>

<style scoped>
.title {
  padding: 0 1em;
  font-size: 1.2em;
  font-weight: bold;
}
.avatar {
  border-radius: 80px;
  width: 50px;
  height: 50px;
}
</style>