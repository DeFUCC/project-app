<template>
  <div class="counter" v-if="count">
    <i class="iconify" data-icon="fe:comment-o"></i>
    {{ count }}
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, computed } from "vue";
import { gun, db, appPath } from "../../store/gun-db";

export default {
  props: {
    id: String,
  },
  async setup(props) {
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
    return {
      count,
    };
  },
};
</script>

<style scoped>
.counter {
  padding: 0 0.7em;
  display: flex;
  align-items: center;
}
</style>