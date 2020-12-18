<template>
  <UserCard :user="user" v-for="user in users.sorted" :key="user?.alias" />
</template>

<script>
import { watchEffect, ref } from "vue";
import { itemColor } from "../../tools/colors";
import { useItems } from "../../use/useItems.js";
export default {
  setup() {
    const users = ref({});
    watchEffect(() => {
      users.value = useItems({
        type: "user",
        mode: "private",
      });
    });
    return {
      users,
      itemColor,
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
.user-line {
  padding: 1em;
}
.avatar {
  border-radius: 80px;
  width: 50px;
  height: 50px;
}
</style>