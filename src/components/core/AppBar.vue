<template>
  <nav id="app-bar">
    <router-link class="logo" to="/">PROJECT APP</router-link>
    <router-link to="/designs">Designs</router-link>
    <router-link to="/projects">Projects</router-link>
    <div class="spacer"></div>
    <router-link v-if="!user.is" to="/auth">Auth</router-link>
    <router-link v-else to="/my">{{ user.is.alias }}</router-link>
  </nav>
</template>

<script>
import { useUser } from "../../use/useUser.js";
export default {
  setup() {
    const { user } = useUser();
    return {
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
  display: flex;
  flex-flow: row nowrap;
  padding: 1em;
  background-color: var(--top-bar);
}
.spacer {
  flex: 10 1 100px;
}
#app-bar a {
  padding: 1em;
}
</style>