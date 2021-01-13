<template>
  <nav
    id="bar"
    :class="{ open }"
    @click="toggle()"
    :style="{
      backgroundColor: itemColor(user.is?.pub),
    }"
  >
    <router-link class="logo" to="/"
      ><img src="/icons/feeds.svg" alt=""
    /></router-link>
    <router-link to="/browse/"
      ><span
        class="iconify"
        data-icon="la:poll-h-solid"
        data-inline="false"
      ></span
    ></router-link>

    <div class="spacer"></div>
    <router-link v-if="!user.is" to="/auth"
      ><span
        class="iconify"
        data-icon="la:sign-in-alt-solid"
        data-inline="false"
      ></span
    ></router-link>
    <router-link v-else to="/my">
      {{ String(user.is.alias).slice(0, 24) || "noname" }}</router-link
    >
    <div class="spacer"></div>
    <router-link to="/about/"
      ><span
        class="iconify"
        data-icon="la:info-circle-solid"
        data-inline="false"
      ></span
    ></router-link>
    <router-link to="/graph/"
      ><span
        class="iconify"
        data-icon="mdi:graph-outline"
        data-inline="false"
      ></span
    ></router-link>
  </nav>
</template>

<script>
import { ref } from "vue";
import { user } from "../../store/user";
import { itemColor } from "../../use/colors";
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
      itemColor,
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
nav {
  scroll-snap-align: start;
  flex: 0 0 42px;
  display: flex;
  align-items: center;
  flex-flow: column nowrap;
  background-color: var(--top-bar);
  white-space: nowrap;
  width: 100%;
}
.router-link-active svg {
  color: #000;
}
.spacer {
  flex: 10 1 100px;
}
#app-bar a {
  padding: 0.5em;
}
a svg {
  font-size: 1.4em;
  color: #555;
  transition: all 300ms ease;
}

@media screen and (max-width: 500px) {
  nav {
    position: fixed;
    z-index: 100;
    bottom: 0;
    display: flex;
    align-items: center;
    flex-flow: row nowrap;
    background-color: var(--top-bar);
    white-space: nowrap;
    width: 100%;
  }
}
</style>