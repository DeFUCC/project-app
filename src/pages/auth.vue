<template lang="pug">
main.auth
  h4 Welcome!
  form#auth(@submit.prevent="")
    input.mv2(type="text", placeholder="Login", v-model="alias")
    input.mv2(
      type="password",
      placeholder="Password",
      name="password",
      v-model="pass"
    )
    button(
      key="auth",
      :disabled="alias && !userExists",
      @click="authUser(alias, pass)"
    ) Log in
    button(
      key="create",
      :disabled="alias && userExists",
      @click="createUser(alias, pass)"
    ) Create a new user
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { user, findUser, authUser, createUser } from "../store/user";
import { useRouter } from "vue-router";

const router = useRouter();
watch(
  () => user.is,
  () => {
    if (user.is) {
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
</script>

<style lang="stylus" scoped>
.auth
  padding 1em

#auth
  display flex
  flex-flow column

button
  margin 1em
</style>