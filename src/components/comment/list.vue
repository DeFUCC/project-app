<template>
  <section class="comments" :class="{ open: state.open }">
    <header class="row" @click="state.open = !state.open">
      Comments
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
              <span class="text">{{ comment.text }}</span>
              <span class="time">{{ format(comment.timestamp, "short") }}</span>
            </div>
          </transition-group>
        </div>
        <button @click="state.add = true" v-if="!state.add">
          <span class="iconify" data-icon="la:plus"></span>
        </button>
        <form v-if="state.add" @submit.prevent>
          <textarea
            class="input"
            name="text"
            rows="5"
            v-model="state.text"
            @keyup.ctrl.enter="addComment()"
          ></textarea>
          <div class="buttons">
            <button @click="state.add = false">
              <span class="iconify" data-icon="la:times"></span>
            </button>
            <button @click="addComment()">
              <span class="iconify" data-icon="la:plus"></span>
            </button>
          </div>
        </form>
      </main>
    </transition>
  </section>
</template>

<script lang="ts">
import { format } from "timeago.js";
import { computed, defineComponent, reactive, ref, watchEffect } from "vue";
import { appPath, db, gun, soul } from "../../store/gun-db";
import { error } from "../../store/history";
import { user } from "../../store/user";
import { Remarkable } from "remarkable";
import { linkify } from "remarkable/linkify";

export default defineComponent({
  props: {
    id: String,
  },
  setup(props) {
    const textarea = ref();
    const state = reactive({
      open: false,
      add: false,
      text: "",
      count: computed(() => {
        return Object.keys(comments).length;
      }),
    });
    const md = new Remarkable().use(linkify);
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

    async function addComment() {
      if (!user.is) {
        return;
      }
      if (!state.text) {
        error("empty comment!");
        return;
      }
      let privateComment = await gun
        .user()
        .get(appPath)
        .get("comment")
        .get(props.id.slice(90 + appPath.length))
        .get(Date.now())
        .put(state.text);
      state.text = "";
      state.add = false;
    }

    return {
      md,
      format,
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
}
.row {
  position: sticky;
  cursor: pointer;
  top: 0;
  padding: 1em;
  background-color: var(--bar-color);
  font-weight: bold;
}
.text {
  padding: 0 0.5em;
}
.time {
  font-size: 0.8em;
  color: #555;
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
.buttons {
  flex: 1 1 20%;
}
.comment {
  padding: 0.5em;
  background-color: #fcfcfc;
  border-radius: 1em;
  margin: 0.5em;
}
.counter {
  padding: 0 0.5em;
}
.chevron {
  transition: all 300ms ease-out;
}
.open .chevron {
  transform: rotate(180deg);
}
</style>