<template lang="pug">
#auth
  .info 
    .text Hello!
    span.close(@click="$emit('close')")
      i.iconify(data-icon="la:times")
  form(@submit.prevent="")
    input.mv2(type="text", placeholder="Login", v-model="alias")
    input.mv2(
      type="password",
      placeholder="Password",
      name="password",
      v-model="pass"
    )
    transition(name="fade")
      button(
        key="auth",
        v-if="alias && userExists",
        @click="authUser(alias, pass)"
      ) Log in
      button(
        key="create",
        v-else="alias && !userExists",
        @click="createUser(alias, pass)"
      ) Create a new user
</template>

<script setup >
import {  ref, defineProps, watch, watchEffect } from "vue";
import { user, findUser, authUser, createUser } from "store@user";

const emit = defineEmits(["close"]);
const props = defineProps({
  open: Boolean,
});
const alias = ref("");
const pass = ref("");
const userExists = ref(null);
watch(alias, (name) => {
  findUser(name, (exists) => {
    userExists.value = exists;
  });
});

watchEffect(() => {
  if (user.is) {
    emit("close");
  }
});
</script>

<style lang="stylus" scoped>
.close
  position: absolute
  right: 0.5em
  top: 0.5em

.info
  padding: 0 1em
  display: flex

form
  display: flex
  flex-flow: column

#auth
  padding: 1em
  position: absolute
  top: 20px
  right: 20px
  min-width: 200px
  max-width: 300px
  width: 80%
  margin: 40px
  z-index: 90
  background-color: var(--background)
  border-radius: 0.5em

button
  margin: 1em
</style>