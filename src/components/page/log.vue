<template lang="pug">
article.logs
  header.log-panel
    .title {{ $t('log.title') }}
    .spacer
    .count {{ state.total }}
    span(v-if="editable", @click="state.open = !state.open")
      i.iconify(data-icon="la:angle-down-solid")
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

<script lang="ts">
import { defineComponent, reactive, ref, watchEffect } from "vue";
import { format } from "../../use/locale";
import { gun } from "../../store/gun-db";
import { error, notify } from "../../store/history";

interface Log {
  date: string;
  tag: string;
  text: string;
}

let logString = "tag | info";

export default defineComponent({
  props: {
    id: String,
    editable: Boolean,
  },
  setup(props) {
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
      let sorted = entries.sort((a: any, b: any) => {
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

    return {
      chronoLogs,
      logs,
      format,
      state,
    };
  },
});
</script>

<style lang="stylus" scoped>
form
  display flex
  align-items center

.logs
  padding 1em
  display flex
  flex-flow column nowrap
  font-size 0.9em

.log-panel
  padding 0.5em
  display flex
  align-items center
  flex 1 0 2em

.log
  display flex
  flex 1 1 2em
  min-height 1em

.log div
  padding 4px

.undefined
  opacity 0.2

.created
  background-color #ddd

.edited
  opacity 0.5

.updated
  background-color rgb(157, 180, 147)
</style>