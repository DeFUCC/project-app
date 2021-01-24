<template lang="pug">
section
  .title 
    h3 {{ $tc('type.donation', 10) }}
    .spacer
    button.support(@click="add = !add")
      i.iconify(data-icon="la:plus")
  transition(name="fade")
    gift-form(v-if="add", :soul="soul", @send="addGift")
  .list
    transition-group(name="fade")
      gift-card(
        v-for="(gift, hash) in gifts",
        :key="hash",
        :gift="gift",
        :hash="hash"
      )
</template>

<script setup lang="ts">
import { defineProps, reactive, ref } from "vue";
import { gun, sea } from "../../store/gun-db";
import { user } from "../../store/user";
import { itemColor } from "../../use/colors";

const props = defineProps({
  soul: String,
});

const add = ref(false);

const gifts = ref({});

async function addGift({ hash, content }) {
  gifts.value[hash] = content;
  add.value = false;
}
</script>

<style lang="stylus" scoped>
section
  padding 0.5em

.title
  display flex
  align-items center
  border-bottom 1px solid var(--border-color)

.support
  font-size 1em

form
  padding 1em
  display flex
  flex-flow column nowrap
</style>