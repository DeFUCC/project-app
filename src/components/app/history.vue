<template>
  <section class="notification">
    <transition-group name="list" tag="div">
      <div
        class="message"
        v-for="(msg, key) in unseen"
        :key="key"
        :style="{
          backgroundColor: eventColors[msg.type],
        }"
      >
        <div class="content">{{ msg.content }}</div>
        <router-link class="more" to="/history">&equiv; </router-link>
      </div>
    </transition-group>
  </section>
</template>

<script>
import { unseen, eventColors } from "../../store/history";
export default {
  setup() {
    return {
      unseen,
      eventColors,
    };
  },
};
</script>

<style scoped>
.notification {
  position: fixed;
  bottom: 2em;
  left: 130px;
  z-index: 50;
}
.message {
  font-size: 0.7em;
  padding: 0.5em;
  background-color: #eee;
  display: flex;
  flex-flow: row;
}
.more {
  padding: 0 0.4em;
  text-decoration: none;
}
.content:first-letter {
  text-transform: capitalize;
}
</style>