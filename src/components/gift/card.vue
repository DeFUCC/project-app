<template lang="pug">
.gift(:style="{ backgroundColor: itemColor(hash) }")
  .hash {{ gift.way }}
  .main {{ gift.quantity }} {{ gift.quality }}
  .parties
    user-pill(:id="gift.from")
    .p TO
    user-pill(:id="gift.to")
  .details {{ gift.text }}
  .spacer
  .at {{ format(gift.timestamp).date }}
</template>

<script setup lang="ts">
import { defineProps } from "vue";
import { itemColor } from "../../use/colors";
import { format } from "../../use/locale";
const props = defineProps({
  gift: Object,
  hash: String,
});
</script>

<style lang="stylus" scoped>
.gift
  padding 0.5em
  display flex
  align-items center

.gift div
  padding 0.5em

.parties
  display flex
  flex-flow row wrap
</style>