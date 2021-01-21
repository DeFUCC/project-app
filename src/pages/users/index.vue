<template lang="pug">
.users 
  user-card(
    v-for="profile in list",
    :key="profile[0]",
    :id="profile[0]",
    :profile="profile[1]"
  ) 
</template>

<script setup lang="ts">
import { computed, reactive } from "vue";
import { db } from "../../store/gun-db";

const users = reactive({});

db.get("user")
  .map()
  .once((data, key) => {
    users[key] = data;
  });

const list = computed(() => {
  let arr = Object.entries(users);
  arr = arr.filter((profile) => Boolean(profile[1]));
  return arr;
});
</script>

<style lang="stylus" scoped>
.users
  padding 0 1em

.card
  padding 2em
</style>