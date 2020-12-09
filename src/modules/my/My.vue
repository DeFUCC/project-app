<template>
  <article class="page" v-if="user.is">
    <header class="bar" :style="{ backgroundColor: itemColor(user.is?.pub) }">
      <user-avatar size="medium" :pic="user.profile.avatar" />

      <div class="title">{{ user.is?.alias }}</div>
      <div class="spacer"></div>
      <button @click="logOut()">🚪 Log out</button>
    </header>
    <div class="bar">
      <router-link to="/my/profile">Profile</router-link>
      <router-link to="/my/stars">Stars</router-link>
    </div>

    <router-view v-slot="{ Component }">
      <transition name="fade">
        <keep-alive>
          <component :is="Component" :user="user.is.pub" />
        </keep-alive>
      </transition>
    </router-view>
  </article>
</template>

<script>
import userAvatar from "../../components/media/UserAvatar.vue";
import { itemColor } from "../../use/colors.js";
import { useUser } from "../../use/useUser.js";
import { useRouter } from "vue-router";
import { watchEffect } from "vue";
export default {
  components: {
    userAvatar,
  },
  setup() {
    const { user, logOut } = useUser();
    const router = useRouter();
    watchEffect(() => {
      if (!user.is) {
        router.push("/auth");
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
.page {
  overflow-y: scroll;
}
.bar {
  display: flex;
  position: sticky;
  z-index: 20;
  top: 0;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: flex-start;
  padding: 1em;
  background-color: var(--bar-color);
}
.bar a {
  padding: 1em;
}
.page {
  width: 100%;
}
.title {
  padding: 0 1em;
  font-size: 1.2em;
  font-weight: bold;
}
</style>