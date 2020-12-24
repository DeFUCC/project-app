<template>
  <article>
    <div class="row">Alias: {{ profile.alias }}</div>
    <div class="row">Pub: {{ profile.pub }}</div>
  </article>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, watch, watchEffect } from "vue";
import { gun } from "../../store/gun-db";
import { useUserProfile } from "../../use/user";

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
      profile,
    };
  },
});
</script>

<style scoped>
</style>