<template>
  <article>
    <h1>Userinfo</h1>
    <section>
      <div
        class="edit-avatar"
        @click="update = true"
        v-if="user.avatar && !update"
        :style="{
          backgroundImage:
            'linear-gradient(hsla(0,100%,100%,0.7), hsla(0,100%,100%,0.5)), url(' +
            user.avatar +
            ')',
        }"
        :src="user.avatar"
        :alt="user.is?.alias"
      >
        &#10000;
      </div>

      <file-uploader
        v-if="!user.avatar || update"
        @loaded="process"
        @close="update = false"
      ></file-uploader>
    </section>
    <section></section>
  </article>
</template>

<script>
import FileUploader from "../../components/FileUploader.vue";
import { useUser } from "../../use/user.js";
import { ref } from "vue";
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
      user.ref.get("avatar").put(img.content);
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