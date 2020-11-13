<template>
  <article>
    <div id="panel">
      <img
        class="avatar"
        v-if="user.avatar"
        :src="user.avatar"
        :alt="user.is?.alias"
      />
      <h1>{{ alias }}</h1>
      <button @click="logOut()">Log out</button>
    </div>

    <router-view></router-view>
  </article>
</template>

<script>
import { useUser, logOut } from "../../use/user.js";
export default {
  props: {
    alias: String,
  },
  setup() {
    const { user } = useUser();
    return {
      user,
      logOut,
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
.avatar {
  border-radius: 80px;
  width: 50px;
  height: 50px;
}
</style>