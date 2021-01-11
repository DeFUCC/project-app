<template>
  <article>
    <header>Export</header>
    <main>
      <div class="row" v-for="(data, key) in item" :key="data">
        <div class="key">{{ key }}</div>
        <div v-if="typeof data != 'object' && data[0] != '~'" class="data">
          {{ data }}
        </div>
        <router-link v-if="data?.[0] == '~'" :to="{ query: { id: data } }">{{
          data
        }}</router-link>
        <div class="data" v-if="typeof data == 'object'">
          <div v-show="!d['>']" class="detail" v-for="d in data" :key="d">
            <div v-if="typeof d != 'object'">{{ d }}</div>
            <div v-if="typeof d == 'object'">
              <router-link :to="{ query: { id: d['#'] } }">{{
                d["#"]
              }}</router-link>
            </div>
          </div>
        </div>
      </div>
    </main>
  </article>
</template>

<script lang="ts">
import { useTitle } from "@vueuse/core";
import { defineComponent, reactive, ref, watchEffect } from "vue";
import { useRoute, useRouter } from "vue-router";
import { gun, appPath } from "../../store/gun-db";

export default defineComponent({
  setup() {
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

    return {
      item,
      id,
      open,
      close,
    };
  },
});
</script>

<style scoped>
.row {
  display: grid;
  grid-template-columns: 120px 1fr;
}
</style>