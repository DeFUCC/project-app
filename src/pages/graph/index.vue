<template>
  <article>
    <div
      :style="{
        backgroundColor: itemColor(i),
      }"
      class="record"
      v-for="(g, i) in graph"
      :key="i"
    >
      <div class="key" @click="g.show = !g.show">{{ i }}</div>
      <transition name="fade">
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
      </transition>
    </div>
  </article>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { gun } from "../../store/gun-db";
import { itemColor } from "../../tools/colors";

export default defineComponent({
  setup() {
    const graph = ref({});
    setInterval(() => {
      graph.value = gun._.graph;
    }, 500);
    return {
      graph,
      itemColor,
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
  cursor: pointer;
}
.prop {
  padding: 0.5em;
}
.key {
  font-weight: bold;
}
</style>