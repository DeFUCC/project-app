<template lang="pug">
.logs
  .log-panel
    .title {{ $t('log.title') }}
    .spacer
    .count {{ state.total }}
    span(v-if="editable", @click="state.open = !state.open")
      .i-la-angle-down
  transition-group(name="list")
    .log(
      v-for="(log, key) in chronoLogs",
      :key="key",
      :class="{ [log[1].split('|')[0]]: true }"
    )
      .date {{ format(log[0], 'short').date }}
      .tag {{ log[1].split('|')[0] }}
      .text {{ log[1].split('|')[1] }}
</template>

<script setup >
import { defineProps, reactive, ref, watchEffect } from "vue";
import { format } from "use@locale";
import { gun } from "store@gun-db";

const props = defineProps({
  id: String,
  editable: Boolean,
});
const state = reactive({
  open: false,
  total: 0,
});

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
  let entries = Object.entries(logs);
  state.total = entries.length;
  let sorted = entries.sort((a, b) => {
    if (!a) {
      return -1;
    }
    if (!b) {
      return 1;
    }
    let diff = b[0] - a[0];
    return diff;
  });
  if (!state.open) {
    chronoLogs.value = sorted.slice(0, 2);
  } else {
    chronoLogs.value = sorted;
  }
});
</script>

<style lang="stylus" scoped>
.logs
  padding: 1em 0
  display: flex
  flex-flow: column nowrap
  font-size: 0.9em

.log-panel
  padding: 0.5em
  display: flex
  align-items: center
  flex: 1 0 2em

.log
  display: flex
  flex: 1 0 3em

.log div
  padding: 4px

.undefined
  opacity: 0.2

.created
  background-color: hsla(0, 0%, 30%, 0.4)

.edited
  opacity: 0.5

.updated
  background-color: rgba(157, 180, 147, 0.4)
</style>