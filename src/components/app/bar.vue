<template>
  <nav id="app-bar" :class="{ open }" @click="toggle()">
    <router-link class="logo" to="/">PROJECT APP</router-link>
    <router-link to="/app">app</router-link>

    <router-link to="/app/users">Users</router-link>
    <router-link v-if="!user.is" to="/app/auth">Auth</router-link>
    <router-link v-else to="/app/my">{{
      String(user.is.alias).slice(0, 24)
    }}</router-link>
    <router-link to="/docs/">Docs</router-link>
    <div class="spacer"></div>
    <router-link to="/app/graph/">Graph</router-link>
    <div class="handle"></div>
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
  font-weight: bold;
}
#app-bar {
  scroll-snap-align: start;
  flex: 0 0 120px;
  display: flex;
  flex-flow: column nowrap;
  padding: 1em;
  background-color: var(--top-bar);

  padding-bottom: 4em;
  position: relative;
}
.spacer {
  flex: 10 1 100px;
}
#app-bar a {
  padding: 1em;
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