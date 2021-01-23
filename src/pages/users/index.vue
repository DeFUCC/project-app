<template lang="pug">
.users 
  user-card(v-for="(user, id) in users", :key="id", :id="id", :profile="user") 
</template>

<script setup lang="ts">
import { computed, reactive, ref } from "vue";
import { db } from "../../store/gun-db";

const users = ref({});

db.get("user")
  .map()
  .once((data, key) => {
    if (!data) return;
    users.value[key] = data;
  });
</script>

<style lang="stylus" scoped>
.users
  padding 0 1em

.card
  padding 2em
</style>