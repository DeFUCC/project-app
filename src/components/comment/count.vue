<template lang="pug">
.text-lg.flex.items-center(v-if="count")
  .i-fe-comment-o
  span {{ count }}
</template>

<script setup >
import { gun, db, appPath } from "store@gun-db";

const props = defineProps({
  id: String,
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

const count = computed(() => {
  return Object.keys(comments).length;
});
</script>
