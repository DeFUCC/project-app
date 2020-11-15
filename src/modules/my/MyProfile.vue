<template>
  <article id="profile">
    <h1>My profile</h1>
    <section class="avatar-editor">
      <div
        class="edit-avatar"
        @click="update = true"
        :style="{
          backgroundImage:
            'linear-gradient(hsla(0,100%,100%,0.7), hsla(0,100%,100%,0.5)), url(' +
            user.profile.avatar +
            ')',
        }"
        :src="user.profile.avatar"
        :alt="user.is?.alias"
      >
        &#10000;
      </div>

      <file-uploader
        v-if="!user.profile.avatar || update"
        @loaded="process"
        @close="update = false"
      ></file-uploader>
    </section>
    <section></section>
  </article>
</template>

<script>
import FileUploader from "../../components/FileUploader.vue";
import { useUser } from "../../use/useUser.js";
import { gun } from "../../store/gun-db.js";
import { ref } from "vue";
import { notify } from "../../store/history.js";
export default {
  props: {
    alias: String,
  },
  components: {
    FileUploader,
  },
  setup() {
    const update = ref(false);
    const { user } = useUser();

    function process(img) {
      if (!img.content) return;
      gun
        .user()
        .get("profile")
        .get("avatar")
        .put(img.content, (st) => {
          console.log(st);
          if (!st.err) {
            update.value = false;
            notify("User avatar updated");
          }
        });
    }
    return {
      update,
      process,
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