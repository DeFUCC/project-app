<template>
  <section class="comments">
    <div class="row">Comments</div>
    <form @submit.prevent>
      <input type="text" v-model="content.text" />
      <button @click="addComment()">
        <span class="iconify" data-icon="la:plus"></span>
      </button>
    </form>
    <div class="comment" v-for="comment in comments" :key="comment.timestamp">
      {{ comment.text }}
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
import { appPath, db, gun, soul } from "../../store/gun-db";
import { error } from "../../store/history";
import { user } from "../../store/user";

export default defineComponent({
  props: {
    id: String,
  },
  setup(props) {
    const comments = reactive({});

    const content = reactive({
      text: "text",
      timestamp: 0,
    });

    const publicComments = db
      .get("comment")
      .get(props.id.slice(90 + appPath.length, -16))
      .get(props.id.slice(-15));

    publicComments.map().on((data, key) => {
      comments[key] = data;
    });

    async function addComment() {
      if (!user.is) {
        return;
      }
      if (!content.text) {
        error("empty comment!");
        return;
      }
      let privateComment = await gun
        .user()
        .get(appPath)
        .get("comment")
        .get(props.id.slice(90 + appPath.length))
        .set(content);
      publicComments.get(Date.now()).put(privateComment);
      content.text = "";
    }
    return {
      appPath,
      content,
      comments,
      addComment,
    };
  },
});
</script>

<style scoped>
.comments {
  padding: 1em;
}
</style>