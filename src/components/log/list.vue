<template>
  <article class="logs">
    <header class="log-panel">
      Logs {{ chronoLogs.length }} / {{ state.total }}

      <div class="spacer"></div>
      <button v-if="editable" @click="state.open = !state.open">
        <span class="iconify" data-icon="la:angle-down-solid"></span>
      </button>
      <button v-if="editable" @click="state.edit = !state.edit">
        <span class="iconify" data-icon="la:plus"></span>
      </button>
    </header>

    <form v-if="state.edit" @submit.prevent>
      <input type="date" v-model="state.date" />
      <input type="time" v-model="state.time" />
      <select name="tag" v-model="log.tag">
        <option :value="tag" v-for="tag in tags" :key="tag">
          {{ tag }}
        </option>
      </select>

      <input type="text" v-model="log.text" />
      <button v-if="editable" @click="addLog()">
        <span class="iconify" data-icon="la:plus"></span>
      </button>
    </form>
    <transition-group name="list">
      <div
        class="log"
        v-for="log in chronoLogs"
        :key="log.timestamp"
        :class="{ [log.tag]: true }"
      >
        <div class="date">{{ format(log.timestamp) }}</div>
        <div class="tag">{{ log.tag }}</div>
        <div class="text">{{ log.text }}</div>
      </div>
    </transition-group>
  </article>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, watchEffect } from "vue";
import { format } from "timeago.js";
import { gun } from "../../store/gun-db";
import { error, notify } from "../../store/history";

interface Log {
  date: string;
  tag: string;
  text: string;
}

export default defineComponent({
  props: {
    id: String,
    editable: Boolean,
  },
  setup(props) {
    const log = reactive({
      timestamp: Date.now(),
      tag: "update",
      text: "logged",
    });
    const state = reactive({
      open: false,
      edit: false,
      total: 0,
      date: new Date().toLocaleDateString("sv-SE"),
      time: `${new Date().getHours()}:${new Date().getMinutes()}`,
    });
    const tags = [
      "created",
      "edited",
      "updated",
      "happened",
      "started",
      "finished",
    ];
    const logs = reactive({});
    gun
      .get(props.id)
      .get("log")
      .map()
      .on((data, key) => {
        logs[key] = data;
      });

    const chronoLogs = ref([]);

    watchEffect(() => {
      let values = Object.values(logs).filter((l: any) => l.timestamp && l.tag);
      state.total = values.length;
      let sorted = values.sort((a: any, b: any) => {
        if (!a.timestamp) {
          return -1;
        }
        if (!b.timestamp) {
          return 1;
        }
        let diff = b.timestamp - a.timestamp;
        return diff;
      });
      if (!state.open) {
        chronoLogs.value = sorted.slice(0, 2);
      } else {
        chronoLogs.value = sorted;
      }
    });

    function addLog() {
      if (Date.parse(state.date + "T" + state.time)) {
        log.timestamp = Date.parse(state.date + "T" + state.time);
      } else {
        error("Incorrect date and time");
      }
      if (log.timestamp > Date.now()) {
        error("Logs are for past events, not future plans.");
        return;
      }
      gun.get(props.id).get("log").get(Date.now()).put(log);
      state.open = false;
    }
    return {
      chronoLogs,
      tags,
      log,
      logs,
      addLog,
      format,
      state,
    };
  },
});
</script>

<style scoped>
form {
  display: flex;
  align-items: center;
}
.logs {
  padding: 1em;
  display: flex;
  flex-flow: column nowrap;
  font-size: 0.9em;
}
.log-panel {
  padding: 0.5em;
  display: flex;
  align-items: center;
  flex: 1 0 2em;
}
.log {
  display: flex;
  flex: 1 1 2em;
}
.log div {
  padding: 4px;
}
.undefined {
  opacity: 0.2;
}
.created {
  background-color: #ddd;
}
.edit {
  opacity: 0.5;
}
.update {
  background-color: rgb(157, 180, 147);
}
</style>