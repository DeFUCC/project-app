<template lang="pug">
main
  button(@click="warn('Checking history')") Check
  button(@click='clear()') Clear
  .line(v-for='(line, i) in history.slice().reverse()' :key='i' :style='{\
  backgroundColor: eventColors[line.type],\
  }')
    .date {{ getDate(line.time) }}
    .content {{ line.content }}

</template>

<script setup lang="ts">
import { history, warn, eventColors, clear } from "../store/history";

function getDate(time) {
  let d = new Date(time);
  return d.toLocaleString();
}
</script>

<style lang="stylus" scoped>
.line
  display flex
  flex-flow row wrap
  align-items center
  margin 2px 0

.date
  font-size 0.8em
  flex 0 0 10em

.content
  flex 4 1
</style>