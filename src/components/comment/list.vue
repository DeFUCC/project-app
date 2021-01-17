<template lang="pug">
section.comments(:class="{ open: state.open }")
  header.row(@click="state.open = !state.open")
    i.iconify(data-icon="fe:comment-o") 
    .title {{ $tc('comment', state.count) }}
    .spacer
    .counter {{ state.count }}
    span.chevron
      i.iconify(data-icon="la:angle-down")
  transition(name="fade")
    main(v-if="state.open")
      .list
        transition-group(name="list")
          comment-line(
            v-for="comment in sorted",
            :key="comment.timestamp",
            :comment="comment",
            @edit="editComment"
          )
      form(v-if="user.is && state.open", @submit.prevent="addComment()")
        user-pill(:id="user.is.pub")
        input.input(name="text", rows="1", v-model="state.text")
        button.send(type="submit")
          i.iconify(data-icon="ri:send-plane-line", data-inline="false")
</template>

<script lang="ts">
import { computed, defineComponent, reactive, ref, watchEffect } from "vue";
import { appPath, db, gun, soul } from "../../store/gun-db";
import { error } from "../../store/history";
import { user } from "../../store/user";
import { format } from "../../use/locale";

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

    function editComment({ timestamp, text }) {
      let privateComment = gun
        .user()
        .get(appPath)
        .get("comment")
        .get(props.id.slice(90 + appPath.length))
        .get(timestamp)
        .put(text);
    }

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
      editComment,
      sorted,
    };
  },
});
</script>

<style lang="stylus" scoped>
.comments
  font-size 0.9em
  margin 8px

.row
  position sticky
  cursor pointer
  top 0
  font-size 1.2em
  padding 1em
  background-color var(--bar-color)
  font-weight bold

main, .buttons
  display flex
  flex-flow column nowrap
  align-items stretch

form
  padding 0 1em

form, header
  display flex
  align-items center

form input
  flex 1 1 320px
  padding 1em
  border-radius 1em
  outline none
  box-shadow none
  border none
  margin 0 0.5em 0 1em
  background-color var(--top-bar)

.counter
  padding 0 0.5em

.chevron
  transition all 300ms ease-out
  padding 0.5em

.open .chevron
  transform rotateZ(180deg)

.send
  font-size 2em
  border none
  padding 0.5em
  margin 0
</style>