<template>
  <section class="form">
    <h4>Welcome!</h4>

    <input class="mv2" type="text" placeholder="Login" v-model="alias" />
    <input
      class="mv2"
      type="password"
      placeholder="Password"
      name="password"
      id=""
      v-model="pass"
    />
    <button
      key="auth"
      :disabled="alias && !userExists"
      @click="authUser(alias, pass)"
    >
      Log in
    </button>
    <button
      key="create"
      :disabled="alias && userExists"
      @click="createUser(alias, pass)"
    >
      Create a new user
    </button>
  </section>
</template>

<script>
import { ref, watch } from "vue";
import { useUser } from "../use/useUser.js";
import { useRouter } from "vue-router";
export default {
  components: {},
  setup() {
    const { user, createUser, findUser, authUser } = useUser();
    const router = useRouter();
    watch(
      () => user.is,
      () => {
        if (user.isLoggedIn) {
          router.push("/my");
        }
      }
    );
    const alias = ref("");
    const pass = ref("");
    const userExists = ref(null);
    watch(alias, (name) => {
      findUser(name, (exists) => {
        userExists.value = exists;
      });
    });

    return {
      user,
      alias,
      pass,
      createUser,
      userExists,
      authUser,
    };
  },
};
</script>

<style>
</style>