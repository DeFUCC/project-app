<template lang="pug">
.statuses 
  .status(
    @click="status[stat] = !status[stat]",
    v-for="(num, stat) in current",
    :key="stat",
    :class="{ active: status[stat], [stat]: true }"
  ) {{ $t(`status.${stat}`) }} {{ num }}
</template>

<script setup lang="ts">
import { ref, defineProps, computed } from "vue";
import { statuses } from "../../../store/model";

const props = defineProps({
  status: Object,
  count: Object,
});

const current = computed(() => {
  let obj = {};
  for (let c in props.count) {
    if (props.count[c]) {
      obj[c] = props.count[c];
    }
  }
  return obj;
});
</script>

<style lang="stylus" scoped>
.statuses
  display flex
  flex-flow row wrap
  padding 0.5em

.status
  cursor pointer
  margin 0.25em
  padding 0.125em 0.5em
  border-radius 6px
  opacity 0.5
  transition all 100ms ease-in-out

.status.active
  opacity 1
</style>