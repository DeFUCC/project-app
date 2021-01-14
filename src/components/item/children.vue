<template lang="pug">
.counters
  item-children-count(
    :id="id",
    :type="type",
    v-for="type in types",
    :key="type"
  )
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import { gun } from "../../store/gun-db";
import { model } from "../../store/model";

export default defineComponent({
  props: {
    id: String,
  },
  setup(props) {
    const type = ref();
    gun
      .get(props.id)
      .get("type")
      .on((data) => {
        type.value = data;
      });
    const types = computed(() => {
      let modelTypes = model[type.value];

      return model[type.value];
    });
    return {
      types,
    };
  },
});
</script>

<style lang="stylus" scoped>
.counters
  flex 1 1 100%
  margin 0
  display flex
  justify-content stretch
  align-items stretch
  flex-flow row wrap
</style>