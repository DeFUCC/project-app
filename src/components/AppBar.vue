<template>
  <nav id="app-bar" :class="{ open }" @click="toggle()">
    <router-link class="logo" to="/">PROJECT APP</router-link>
    <router-link to="/designs">Designs</router-link>
    <router-link to="/projects">Projects</router-link>
    <router-link to="/objects">Objects</router-link>
    <div class="spacer"></div>
    <router-link to="/users">Users</router-link>
    <router-link v-if="!user.is" to="/auth">Auth</router-link>
    <router-link v-else to="/my">{{ user.is.alias }}</router-link>
    <div class="handle"></div>
  </nav>
</template>

<script>
import { ref } from "vue";
import { useUser } from "../use/useUser.js";
export default {
  name: "AppBar",
  setup() {
    const { user } = useUser();
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
}
</style>