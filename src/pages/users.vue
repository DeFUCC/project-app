<template>
  <article>
    <div class="panel">Users</div>
    <section class="columns">
      <div class="column">
        <UserCard :user="user" v-for="user in users" :key="user?.alias" />
      </div>
      <div class="column"><router-view></router-view></div>
    </section>
  </article>
</template>

<script>
import { useUsers } from "../use/users";
export default {
  setup() {
    let { users } = useUsers();
    return {
      users,
    };
  },
};
</script>

<style scoped>
.columns {
  overflow-x: scroll;
  padding: 2em;
  display: flex;
  flex-flow: row nowrap;
  align-items: flex-start;
  justify-content: space-between;
}
.panel {
  display: flex;
  padding: 2em 0 0 2em;
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