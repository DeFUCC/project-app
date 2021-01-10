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
      <div class="key" @click="g.show = !g.show">
        <div
          :style="{
            backgroundColor: itemColor(i.slice(1, 88)),
          }"
          v-if="i[0] == '~'"
          class="user"
        >
          {{ i.slice(1, 6) }}...
        </div>

        <div class="item">{{ i[0] == "~" ? i.slice(88) : i }}</div>
      </div>
      <transition name="fade">
        <section v-if="g.show">
          <div class="id">{{ i }}</div>
          <div
            class="prop"
            v-for="(r, j) in g"
            :key="j"
            v-show="j != '_' && j != 'show'"
          >
            <div class="title">{{ j }}</div>
            <div class="content">{{ r }}</div>
          </div>
        </section>
      </transition>
    </div>
  </article>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import { gun } from "../../../store/gun-db";
import { itemColor } from "../../../tools/colors";

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
  display: flex;
}
.user {
  padding: 0 1em;
}
.title {
  font-weight: bold;
}
</style>