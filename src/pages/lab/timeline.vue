<template lang="pug">
.calendar
  .date(v-for="(item, key) in list", :key="key")
    .info
      type-icon(:type="item.type")
      p {{ item.title }} {{ format(item?.dateStart)?.date }} &mdash; {{ format(item?.dateFinish)?.date }}
    .span
      .before(:style="{ flex: startPoint(item?.dateStart) }")
      .last(
        :style="{ backgroundColor: itemColor(item.soul), flex: span(item?.dateStart, item?.dateFinish) }"
      )
      .after
</template>

<script setup >
import { computed, defineComponent,  reactive } from "vue";
import { db, soul } from "store@gun-db";
import { itemColor } from "use@colors";
import { format } from "use@locale";

const items = reactive({});
db.map()
  .map()
  .on((d, k) => {
    if (d?.dateStart || d?.dateFinish) {
      items[k] = d;
      items[k].id = k;
      items[k].soul = soul(d);
    }
  });

const list = computed(() => {
  return Object.values(items).sort((a, b) => {
    return a.dateStart > b.dateStart ? 1 : -1;
  });
});

function startPoint(time) {
  if (!time) return;
  let now = Date.now();
  //@ts-ignore
  let start = list.value[0].dateStart;
  let full = now - start;
  let startOffset = time - start;
  return startOffset / full;
}

function span(start, finish = Date.now()) {
  let now = Date.now();
  //@ts-ignore
  let begin = list.value[0].dateStart;
  start = start || begin;
  let full = now - begin;
  let length = finish - start;
  return length / full;
}
</script>

<style lang="stylus" scoped>
.calendar
  display: flex
  flex-flow: column

.date
  display: flex
  position: relative

.info
  display: flex
  flex-flow: row
  align-items: center
  z-index: 30

.last
  padding: 1em

.span
  position: absolute
  width: 100%
  height: 100%
  display: flex
  flex: 1 0 100%
</style>