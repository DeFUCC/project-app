<template>
  <article v-if="user.is" :style="{ backgroundColor: itemColor(user.is?.pub) }">
    <div id="panel">
      <img
        class="avatar"
        v-if="user.avatar"
        :src="user.avatar"
        :alt="user.is?.alias"
      />
      <div class="title">{{ user.is?.alias }}</div>
      <div class="spacer"></div>
      <button @click="logOut()">🚪 Log out</button>
    </div>
    <router-link to="/my/profile">Profile</router-link>
    <router-view></router-view>
  </article>
</template>

<script>
import { itemColor } from "../../use/colors.js";
import { useUser } from "../../use/user.js";
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
#panel {
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  justify-content: space-between;
}
.spacer {
  flex: 10;
}
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