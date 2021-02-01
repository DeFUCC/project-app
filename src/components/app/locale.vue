<template lang="pug">
transition(name="fade")
  .locale.active(@click="edit = !edit", v-if="!edit") {{ locale.toUpperCase() }}
  .locale.choose(v-else)
    span.choice(
      v-for="loc in locales",
      @click="changeLocale(loc); edit = false",
      :key="loc",
      :class="{ active: loc == locale }"
    ).
      {{ loc.toUpperCase() }}
</template>

<script setup >
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import { changeLocale, locales } from "../../locales/i18n";

const edit = ref(false);
const { locale } = useI18n();
</script>

<style lang="stylus" scoped>
.locale
  align-self center
  display flex
  white-space nowrap
  justify-content center
  flex 0 1 2em
  padding 0.5em 1em
  cursor pointer
  border 2px solid var(--text-color)
  border-radius 2em
  opacity 0.7

.choice
  padding 0 6px

.active
  font-weight bold
</style>