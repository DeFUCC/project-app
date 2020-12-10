<template>
  <article id="the-history">
    <button @click="warn('Checking history')">Check</button>
    <button @click="clear()">Clear</button>
    <div
      class="line"
      v-for="(line, i) in history.slice().reverse()"
      :key="i"
      :style="{
        backgroundColor: eventColors[line.type],
      }"
    >
      <div class="date">{{ getDate(line.time) }}</div>
      <div class="content">{{ line.content }}</div>
    </div>
  </article>
</template>

<script>
import { history, warn, eventColors, clear } from "../store/history.js";

export default {
  setup() {
    function getDate(time) {
      let d = new Date(time);
      return d.toLocaleString();
    }
    return {
      history,
      clear,
      warn,
      getDate,
      eventColors,
    };
  },
};
</script>

<style scoped>
.line {
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  margin: 2px 0;
}
.date {
  font-size: 0.8em;
  flex: 0 0 10em;
}
.content {
  flex: 4 1;
}
</style>