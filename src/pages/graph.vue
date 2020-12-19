<template>
  <article>
    <div class="record" v-for="(g, i) in graph" :key="i">
      <div class="key" @click="g.show = !g.show">{{ i }}</div>
      <section v-if="g.show">
        <div
          class="prop"
          v-for="(r, j) in g"
          :key="j"
          v-show="j != '_' && j != 'show'"
        >
          <div class="key">{{ j }}</div>
          <div class="content">{{ r }}</div>
        </div>
      </section>
    </div>
  </article>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
import { gun } from "../store/gun-db";

export default defineComponent({
  setup() {
    const graph = reactive(gun._.graph);
    return {
      graph,
    };
  },
});
</script>

<style scoped>
article {
  overflow-y: scroll;
}
.record {
  font-size: 12px;
  border: 1px solid #aaa;
}
.prop {
  padding: 0.5em;
}
.key {
  font-weight: bold;
}
</style>