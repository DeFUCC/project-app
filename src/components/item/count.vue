<template>
  <div class="count">
    <img class="icon" :src="icon" alt="" />
    {{ count }}
  </div>
</template>

<script>
import { useCount } from "../../use/count";
export default {
  props: {
    id: String,
    type: String,
  },
  setup(props) {
    const { count } = useCount(props.id, props.type);
    const icon = `/svg/${props.type}.svg`;
    return {
      count,
      icon,
    };
  },
};
</script>

<style>
.count {
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: center;
  padding: 0.5em;
  color: #444;
  background-color: hsla(0, 0%, 100%, 0.2);
  opacity: 0.9;
  flex: 1;
}
</style>