<template>
  <UserCard :user="user" v-for="user in users" :key="user?.alias" />
</template>

<script>
import { itemColor } from "../../tools/colors";
import { useUsers } from "../../use/users";
export default {
  setup() {
    let { users } = useUsers();
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