<template>
  <article class="logs">
    <h4>Logs</h4>
    <div class="log" v-for="log in chronoLogs" :key="log.date">
      <div class="type">{{ log.type }}</div>
      <div class="date">{{ format(log.date) }}</div>
      <div class="text">{{ log.text }}</div>
    </div>
    <form @submit.prevent>
      <select name="type" v-model="log.type">
        <option :value="type" v-for="type in types" :key="type">
          {{ type }}
        </option>
      </select>
      <input id="date" type="date" v-model="log.date" />
      <input type="text" v-model="log.text" />
      <button v-if="editable" @click="addLog()">log</button>
    </form>
  </article>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, watchEffect } from "vue";
import { format } from "timeago.js";
import { gun } from "../../store/gun-db";

interface Log {
  date: string;
  type: string;
  text: string;
}

export default defineComponent({
  props: {
    id: String,
    editable: Boolean,
  },
  setup(props) {
    const log = reactive({
      date: null,
      type: "update",
      text: "logged",
    });
    const types = ["create", "edit", "update", "start", "finish"];
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
      chronoLogs.value = Object.values(logs).sort((a, b) => {
        const a2 = (a as unknown) as Log;
        const b2 = (a as unknown) as Log;
        return Number(Date.parse(a2.date)) - Number(Date.parse(b2.date));
      });
    });

    function addLog() {
      let now = log.date ? log.date : Date.now();
      gun.get(props.id).get("log").get(now).put(log);
      log.date = log.type = log.text = null;
    }
    return {
      chronoLogs,
      types,
      log,
      logs,
      addLog,
      format,
    };
  },
});
</script>

<style scoped>
.logs {
  padding: 1em;
  display: flex;
  flex-flow: column nowrap;
  font-size: 0.9em;
}
.log {
  display: flex;
}
.log div {
  padding: 4px;
}
</style>