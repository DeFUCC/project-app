<template lang="pug">
article
  header Export
  section
    .row(v-for="(data, key) in item", :key="data")
      .key {{ key }}
      .data(v-if="typeof data != 'object' && data[0] != '~'")
        | {{ data }}
      router-link(v-if="data?.[0] == '~'", :to="{ query: { id: data } }")
        | {{ data }}
      .data(v-if="typeof data == 'object'")
        .detail(v-for="(dt, k) in data", :key="k")
          div(v-if="typeof dt != 'object'") {{ dt }}
          div(v-if="dt && typeof dt == 'object'")
            router-link(:to="{ query: { id: dt['#'] } }") {{ dt['#'] }}
</template>

<script setup >
import { useTitle } from "@vueuse/core";
import { reactive, ref, watchEffect } from "vue";
import { useRoute, useRouter } from "vue-router";
import { gun, appPath } from "store@gun-db";

const route = useRoute();
const router = useRouter();
const title = useTitle();
const id = ref();
const item = ref({});
watchEffect(() => {
  id.value = route.query.id || appPath;
  item.value = {};
  if (id.value) {
    gun
      .get(id.value)
      .map()
      .on((d, k) => {
        item.value[k] = d;
        if (k == "title") {
          title.value = d;
        }
      });
  }
});
function close() {
  router.push({ path: "app" });
}
function open(val) {
  if (val[0] != "~") {
    return;
  }
  router.push({
    query: {
      id: val,
    },
  });
}
</script>

<style lang="stylus" scoped>
.row
  display: grid
  grid-template-columns: 120px 1fr
</style>