<template lang="pug">
form(@submit.prevent="addGift()")
  .row
    user-pill(:id="gift.from")
    .p TO
    user-pill(:id="gift.to")

  .row
    select(v-model="gift.way")
      option(v-for="way in ways", :value="way") {{ way }}
    input(type="number", min="0", step="0.1", v-model="gift.quantity")
    input(type="text", v-model="gift.quality")
  textarea(v-model="gift.text")
  button(type="submit") Send
</template>

<script setup lang="ts">
import { defineEmit, ref, defineProps } from "vue";
import { gun, sea } from "../../store/gun-db";
import { user } from "../../store/user";
import { itemColor } from "../../use/colors";
const emit = defineEmit(["send"]);

const props = defineProps({
  soul: String,
});

const ways = ["public", "private"];

const gift = ref({
  way: "public",
  type: "currency",
  quantity: 0,
  quality: "USD",
  text: "",
  for: props.soul,
  from: user.is.pub,
  to: props.soul.slice(1, 88),
});

async function addGift() {
  let content = { ...gift.value, timestamp: Date.now() };
  let hash = await sea.work(content, null, null, { name: "SHA-256" });
  emit("send", { hash, content });
}
</script>

<style lang="stylus" scoped>
form
  padding 1em

.row
  display flex
  align-items center

.row > div
  padding 1em
</style>