<template lang="pug">
.publish(v-if="isMine(soul)")
  button(v-if="!isPublished", @click="publish()") Publish
  button(v-else, @click="unpublish()") Unpublish
</template>

<script setup lang="ts">
import { defineProps, ref } from "vue";
import { gun, genUuid, cutUuid, appPath } from "../../store/gun-db";
import { isMine } from "../../store/user";

const props = defineProps({
  soul: String,
  type: String,
});
const id = cutUuid(props.soul);
const isPublished = ref(true);
const publicRef = gun
  .get(appPath)
  .get(props.type)
  .get(id || genUuid());
const privateRef = gun.get(props.soul);

publicRef.on((data) => {
  isPublished.value = data;
});

function unpublish() {
  publicRef.put(null);
}

function publish() {
  publicRef.put(privateRef);
}
</script>

<style lang="stylus" scoped>
.publish
  padding 0.5em 1em

button
  background-color var(--secondary-button)
</style>