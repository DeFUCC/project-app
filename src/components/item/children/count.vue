<template lang="pug">
.count(v-if="count > 0")
  type-icon(:type="type")
  | {{ count }}
</template>

<script setup >
import { computed, defineProps, reactive, ref } from "vue";
import { gun } from "../../../store/gun-db";

const props = defineProps({
  id: String,
  type: String,
});
const counter = ref({});
gun
  .get(props.id)
  .get(props.type)
  .once((data, key) => {
    if (data) {
      for (let key in data) {
        if (data[key] && key != "_") {
          counter.value[key] = true;
        }
      }
    }
  });
const count = computed(() => Object.keys(counter.value).length);
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