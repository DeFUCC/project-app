<template>
  <div class="count" v-if="count > 0">
    <img class="icon" :src="icon" alt="" />
    {{ count }}
  </div>
</template>

<script lang="ts">
import { computed, reactive } from "vue";
import { gun } from "../../../store/gun-db";
export default {
  props: {
    id: String,
    type: String,
  },
  setup(props) {
    const items = reactive({});
    gun
      .get(props.id)
      .get(props.type)
      .map()
      .on((data: any, key: string) => {
        items[key] = data;
      });
    const count = computed(() => Object.keys(items).length);
    const icon = `/svg/${props.type}.svg`;
    return {
      count,
      icon,
    };
  },
};
</script>

<style scoped>
.count {
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: center;
  padding: 0.5em 0.5em 0.5em 0.3em;
  border-radius: 3em;
  color: #444;
  background-color: hsla(0, 0%, 100%, 0.2);
  opacity: 0.9;
  flex: 1;
}
.icon {
  width: 1.5em;
}
</style>