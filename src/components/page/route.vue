
<template>
  <div class="row">
    <span
      v-for="(parent, i) in route"
      :key="parent"
      :style="{
        backgroundColor: itemColor(parent.soul),
      }"
      class="path"
      :class="{ item: i == route.length - 1 }"
    >
      <IconType :type="parent.type" />
      <span class="title">{{ parent.title }}</span>
    </span>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, watchEffect } from "vue";
import { appPath, db, gun, soul } from "../../store/gun-db";
import { itemColor } from "../../tools/colors";

export default defineComponent({
  emits: ["select"],
  props: {
    id: String,
  },
  setup(props, { emit }) {
    const route = reactive([]);

    getParents();

    async function getParents() {
      route.length = 0;
      let id = props.id;
      for (let p = 0; p < 12; p++) {
        if (!id) {
          break;
        }
        route[p] = await gun.get(id);
        route[p].soul = id;
        id = route[p]?.parent;
      }
      route.reverse();
    }

    return {
      itemColor,
      route,
    };
  },
});
</script>

<style scoped>
.row {
  display: flex;
  align-items: stretch;
}
.path {
  display: flex;
  align-items: center;
  flex: 1 1 auto;
  word-wrap: none;
  overflow: hidden;
}
.path.item .title,
.path:hover .title {
  width: 200px;
}
.title {
  white-space: nowrap;
  width: 4em;
  transition: all 300ms ease-in-out;
}
</style>