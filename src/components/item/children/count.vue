<template lang="pug">
.count(v-if="count > 0")
  img.icon(:src="icon", alt="")
  | {{ count }}
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

<style lang="stylus" scoped>
.count
  display flex
  flex-flow row nowrap
  align-items center
  justify-content center
  color var(--text-color)
  background-color hsla(0, 0%, 100%, 0.1)
  opacity 0.9
  flex 1
  padding 1em

.icon
  width 1.5em
</style>