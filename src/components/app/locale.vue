<template lang="pug">
.locale.active(@click="edit = !edit", v-show="!edit") {{ locale }}
.locale.choose(v-if="edit")
  span.locale(
    v-for="loc in locales",
    @click="changeLocale(loc); edit = false",
    :key="loc",
    :class="{ active: loc == locale }"
  ).
    {{ loc }}
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
  padding 0.5em
  cursor pointer

.active
  font-weight bold
</style>