<template>
  <article class="page" v-if="user.is">
    <header class="bar" :style="{ backgroundColor: itemColor(user.is?.pub) }">
      <div class="title">{{ user.is?.alias }}</div>
      <div class="spacer"></div>
      <button @click="logOut()">🚪 Log out</button>
    </header>
    <div class="bar">
      <router-link to="/my">Profile</router-link>
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
import { itemColor } from "../use/colors";
import { user, logOut } from "../store/user";
import { useRouter } from "vue-router";
import { watchEffect } from "vue";
export default {
  setup() {
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