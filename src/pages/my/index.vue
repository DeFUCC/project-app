<template>
  <article id="profile">
    <h1>My profile</h1>
    <section class="avatar-editor">
      {{ user.info.createdAt }}
      <button v-if="!published" @click="publishUser()">Publish</button>
    </section>
  </article>
</template>

<script lang="ts">
import { ref } from "vue";
import { db } from "../../store/gun-db";
import { user, publishUser } from "../../store/user";

export default {
  props: {
    alias: String,
  },

  setup(props) {
    const published = ref(false);
    db.get("user")
      .get(user.is.pub)
      .once((val) => {
        published.value = true;
      });
    return {
      publishUser,
      published,
      user,
    };
  },
};
</script>

<style scoped>
#profile {
  padding: 1em;
}
.avatar-editor {
  display: flex;
}
.edit-avatar {
  border-radius: 80px;
  display: flex;
  background-repeat: no-repeat;
  height: 100px;
  width: 100px;
  justify-content: center; /* align horizontal */
  align-items: center; /* align vertical */
  font-size: 4em;
  color: black;
  cursor: pointer;
  font-weight: bold;
}
</style>