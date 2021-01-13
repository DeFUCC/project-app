<template>
  <router-link :to="'/users/' + profile.pub" class="user">
    <UserAvatar size="small" :pic="profile.avatar" class="pad" />
    <span
      class="alias"
      :style="{
        borderColor: itemColor(profile.pub),
      }"
    >
      {{ profile.alias }}
      <slot></slot>
    </span>
  </router-link>
</template>

<script lang="ts">
import { defineComponent, reactive, watchEffect } from "vue";
import { db, gun } from "../../store/gun-db";
import { itemColor } from "../../use/colors";
import { truncate } from "../../use/item";

export default defineComponent({
  props: {
    id: String,
  },
  setup(props) {
    const profile = reactive({
      alias: null,
      pub: null,
      avatar: null,
    });

    watchEffect(() => {
      if (props.id) {
        db.get("user")
          .get(props.id)
          .on((data, key) => {
            profile.alias = truncate(String(data.alias), 24);
            profile.pub = data.pub;
            profile.avatar = data.icon;
          });
      }
    });

    return { profile, itemColor };
  },
});
</script>

<style scoped>
.pad {
  padding-right: 0.5em;
}
.alias {
  border-bottom-style: solid;
  border-bottom-width: 4px;
}
.user {
  display: inline-flex;
  align-items: center;
  border-radius: 1em;
  padding: 4px;
  white-space: nowrap;
}
</style>