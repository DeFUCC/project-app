<template lang="pug">
article(ref="graph")
  section.nodes
    router-link.node(
      :to="{ path: '/app/page', query: { id: node.id } }",
      v-for="node in nodes",
      :key="node",
      :id="node.id",
      :style="{ backgroundColor: itemColor(node.id) }"
    )
      type-icon(:type="node.type")
      |
      | {{ node.name }} {{ node.x }} {{ node.y }}
  section.links
    .link(v-for="link in links", :key="link")
      .from(:style="{ backgroundColor: itemColor(link.source) }")
      .to(:style="{ backgroundColor: itemColor(link.target) }")
</template>

<script >
import { defineComponent, ref, reactive, watchEffect } from "vue";
import { itemColor } from "use@colors";
import { useGraph } from "use@graph";
import { throttledWatch, useResizeObserver } from "@vueuse/core";
import { db, gun, soul } from "store@gun-db";
import { types } from "store@model";

export default defineComponent({
  setup() {
    const graph = ref(null);
    const nodes = reactive([]);
    const links = reactive([]);
    const options = reactive({
      nodeSize: 12,
      nodeLabels: true,
      linkWidth: 2,
    });
    const colors = {
      design: "#111",
      project: "#aaa",
      object: "#a0a",
      event: "#00a",
      user: "#0ff",
    };

    for (let type of types) {
      db.get(type)
        .map()
        .on((data, key) => {
          if (data && typeof data == "object" && data.title) {
            if (!nodes.find((node) => node.id == soul(data))) {
              nodes.push({
                name: data.title || data.description,
                id: soul(data),
                type: data.type,
                data: data,
                _color: colors[data.type],
                _cssClass: "graph-node",
              });
            }
          }
        });
    }

    throttledWatch(
      nodes,
      () => {
        for (let node of nodes) {
          for (let type of types) {
            if (node.data[type]) {
              gun
                .get(node.id)
                .get(type)
                .map()
                .on((data, key) => {
                  if (data && nodes.find((n) => n.id == soul(data))) {
                    if (
                      !links.find((link) => {
                        return (
                          link.source == node.id && link.target == soul(data)
                        );
                      })
                    ) {
                      links.push({
                        source: node.id,
                        target: soul(data),
                      });
                    }
                  }
                });
            }
          }
        }
      },
      {
        throttle: 700,
      }
    );

    function parse() {}

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

<style lang="stylus" scoped>
.node
  padding: 0.5em
  border-radius: 2em

.link, .node
  display: flex
  align-items: center

.link div
  padding: 1em

.link div:first-child
  border-radius: 1em 0 0 1em

.link div:last-child
  border-radius: 0 1em 1em 0

.links, .nodes
  display: flex
  flex-flow: row wrap
</style>