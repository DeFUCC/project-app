<template>
  <section class="comments" :class="{ open: state.open }">
    <header class="row" @click="state.open = !state.open">
      <i class="iconify" data-icon="fe:comment-o"></i>&nbsp; Comments
      <div class="spacer"></div>
      <div class="counter">
        {{ state.count }}
      </div>
      <span class="chevron">
        <i class="iconify" data-icon="la:angle-down"></i>
      </span>
    </header>

    <transition name="fade">
      <main v-if="state.open">
        <div class="list">
          <transition-group name="list">
            <div
              class="comment"
              v-for="comment in sorted"
              :key="comment.timestamp"
            >
              <UserPill :author="comment.author" />
              <div class="text">{{ comment.text }}</div>
              <div class="time">
                {{ format(comment.timestamp).date }}
              </div>
            </div>
          </transition-group>
        </div>

        <form v-if="user.is && state.open" @submit.prevent>
          <textarea
            class="input"
            name="text"
            rows="1"
            v-model="state.text"
            @keyup.ctrl.enter="addComment()"
          ></textarea>

          <button class="send" @click="addComment()">
            <span class="iconify" data-icon="fe:commenting"></span>
          </button>
        </form>
      </main>
    </transition>
  </section>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, ref, watchEffect } from "vue";
import { appPath, db, gun, soul } from "../../store/gun-db";
import { error } from "../../store/history";
import { user } from "../../store/user";
import { format } from "../../tools/locale";

export default defineComponent({
  props: {
    id: String,
  },
  setup(props) {
    const textarea = ref();
    const state = reactive({
      open: true,
      text: "",
      count: computed(() => {
        return Object.keys(comments).length;
      }),
    });
    const comments = reactive({});

    db.get("user")
      .map()
      .get("pub")
      .on((pub) => {
        gun
          .user(pub)
          .get(appPath)
          .get("comment")
          .get(props.id.slice(90 + appPath.length))
          .map()
          .on((data, key) => {
            comments[key] = {
              timestamp: key,
              author: pub,
              text: data,
            };
          });
      });

    const sorted = computed(() => {
      let list = Object.values(comments).sort((a: any, b: any) => {
        return Number(a.timestamp) - Number(b.timestamp);
      });
      return list;
    });

    function addComment() {
      if (!user.is) {
        return;
      }
      if (!state.text) {
        error("empty comment!");
        return;
      }
      let privateComment = gun
        .user()
        .get(appPath)
        .get("comment")
        .get(props.id.slice(90 + appPath.length))
        .get(Date.now())
        .put(state.text);
      state.text = "";
    }

    return {
      format,
      user,
      state,
      comments,
      addComment,
      sorted,
    };
  },
});
</script>

<style scoped>
.comments {
  font-size: 0.9em;
  margin: 8px;
  border: 1px solid #ccc;
}
.row {
  position: sticky;
  cursor: pointer;
  top: 0;
  font-size: 1.2em;
  padding: 1em;
  background-color: var(--bar-color);
  font-weight: bold;
}
.text {
  padding: 0 0.5em;
}
.time {
  font-size: 0.8em;
  color: #999;
  position: absolute;
  right: 0.8em;
  top: 1.2em;
}
main,
.buttons {
  display: flex;
  flex-flow: column nowrap;
  align-items: stretch;
}
form,
header {
  display: flex;
  align-items: center;
}
form textarea {
  flex: 1 1 80%;
}
.comment {
  padding: 0.5em;
  background-color: #fcfcfc;
  border-radius: 1em;
  margin: 0.5em;
  position: relative;
  line-height: 1.5em;
  display: flex;
  flex-flow: row wrap;
  align-items: center;
}
.counter {
  padding: 0 0.5em;
}
.chevron {
  transition: all 300ms ease-out;
  padding: 0.5em;
}
.open .chevron {
  transform: rotateZ(180deg);
}
.send {
  font-size: 2em;
  border: none;
  padding: 0.5em;
  margin: 0 0.5em 0 0;
}
</style>