<template>
  <nav id="app-bar" :class="{ open }" @click="toggle()">
    <router-link class="logo" to="/"
      ><img src="/icons/feeds.svg" alt=""
    /></router-link>
    <router-link to="/app">app</router-link>

    <router-link to="/app/users">Users</router-link>

    <router-link to="/app/graph/">Graph</router-link>
    <router-link to="/about/">About</router-link>
    <div class="spacer"></div>
    <router-link v-if="!user.is" to="/app/auth"
      ><span
        class="iconify"
        data-icon="la:sign-in-alt-solid"
        data-inline="false"
      ></span
    ></router-link>
    <router-link v-else to="/app/my">
      {{ String(user.is.alias).slice(0, 24) || "noname" }}</router-link
    >
  </nav>
</template>

<script>
import { ref } from "vue";
import { user } from "../../store/user";
export default {
  name: "AppBar",
  setup() {
    const open = ref(false);
    function toggle() {
      open.value = !open.value;
    }
    return {
      open,
      toggle,
      user,
    };
  },
};
</script>

<style scoped>
.logo {
  height: 32px;
  width: 32px;
  flex: 0 0 32px;
}
#app-bar {
  scroll-snap-align: start;
  flex: 0 0 42px;
  display: flex;
  align-items: center;
  flex-flow: row nowrap;
  background-color: var(--top-bar);
  white-space: nowrap;
  width: 100%;
}
.spacer {
  flex: 10 1 100px;
}
#app-bar a {
  padding: 0.5em;
}
a svg {
  font-size: 2em;
}
.handle {
  display: none;
  opacity: 0.8;
  cursor: pointer;
  position: absolute;
  right: -30px;
  bottom: calc(50% - 60px);
  padding: 60px 40px;
  background-color: var(--top-bar);
  border-radius: 20px;
  z-index: 30;
}
@media screen and (max-width: 500px) {
  #app-bar {
    position: absolute;
    height: 100vh;
    transform: translateX(-160px);
    transition: all 300ms ease;
    z-index: 100;
  }
  #app-bar.open {
    transform: translateX(0);
  }
  #app-bar .handle {
    display: block;
  }
}
</style>