<template>
  <article class="page">
    <div
      class="alias"
      :style="{
        backgroundColor: itemColor(profile.pub),
      }"
    >
      <UserAvatar class="pad" size="medium" :pic="profile.avatar" />
      {{ profile.alias }}
    </div>
  </article>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, watch, watchEffect } from "vue";
import { gun } from "../../store/gun-db";
import { itemColor } from "../../tools/colors";
import { useUserProfile } from "../../use/userProfile";

export default defineComponent({
  props: {
    user: {
      type: String,
      default: "",
    },
  },
  setup(props) {
    const profile = ref({});
    watchEffect(() => {
      profile.value = useUserProfile(props.user);
    });

    return {
      itemColor,
      profile,
    };
  },
});
</script>

<style scoped>
.pad {
  margin: 0 0.5em 0 0;
}
.page {
  padding: 1em;
  overflow-y: scroll;
}
.alias {
  padding: 0.5em;
  font-size: 2em;
  font-weight: bold;
  display: flex;
  width: max-content;
  align-items: center;
}
</style>