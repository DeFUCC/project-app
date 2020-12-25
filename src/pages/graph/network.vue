<template>
  <article ref="graph">
    <section class="nodes">
      <div
        class="node"
        v-for="node in nodes"
        :key="node"
        :id="node.id"
        :style="{ backgroundColor: itemColor(node.id) }"
      >
        <IconType :type="node.type" />
        {{ node.name }} {{ node.x }} {{ node.y }}
      </div>
    </section>
    <section class="links">
      <div class="link" v-for="link in links" :key="link">
        <div
          class="from"
          :style="{ backgroundColor: itemColor(link.source) }"
        ></div>
        <div
          class="to"
          :style="{ backgroundColor: itemColor(link.target) }"
        ></div>
      </div>
    </section>
    <div id="svg"></div>
  </article>
</template>

<script lang="ts">
import { defineComponent, ref, watchEffect } from "vue";
import { itemColor } from "../../tools/colors";
import { useGraph } from "../../use/graph";
import { useResizeObserver } from "@vueuse/core";

export default defineComponent({
  setup() {
    const { nodes, links, options } = useGraph();
    const graph = ref(null);

    return {
      graph,
      nodes,
      links,
      options,
      itemColor,
    };
  },
});
</script>

<style scoped>
.node {
  padding: 0.5em;
  border-radius: 2em;
}

.link,
.node {
  display: flex;
  align-items: center;
}
.link div {
  padding: 1em;
}
.link div:first-child {
  border-radius: 1em 0 0 1em;
}
.link div:last-child {
  border-radius: 0 1em 1em 0;
}
.links,
.nodes {
  display: flex;
  flex-flow: row wrap;
}
</style>