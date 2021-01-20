<template lang="pug">
.users
  user-card(v-for="(data, key) in users", :key="key", :user="data")
</template>

<script setup lang="ts">
import { reactive } from "vue";
import { db, gun } from "../../store/gun-db";

const users = reactive({});

db.get("user")
  .map()
  .on((data, key) => {
    users[key] = data;
  });
</script>

<style lang="stylus" scoped></style>