<template lang="pug">
.type(@click="$router.push({ path: '/' + type })")
  item-type(:type="type")
  .name {{ $tc(`type.${type}`, count) }}
  .spacer
  .count {{ count }}
</template>

<script lang="ts">
import { computed, defineComponent, reactive, ref } from "vue";
import { appPath, gun } from "../../store/gun-db";

export default defineComponent({
  props: {
    type: String,
  },
  setup(props) {
    const list = reactive({});
    gun
      .get(appPath)
      .get(props.type)
      .map()
      .once((data, key) => {
        if (data) list[key] = data;
      });
    const count = computed(() => {
      return Object.keys(list).length;
    });
    return {
      count,
    };
  },
});
</script>

<style lang="stylus" scoped>
.type
  font-size 1em
  opacity 0.4
  cursor pointer
  transition all 300ms ease
  display flex
  align-items center
  background-color var(--top-bar)
  padding 0 0.4em 0 0

.type img
  font-size 2em
  height 2em

.type .count
  padding 8px
  font-size 12px
  white-space nowrap
  font-weight bold

.type:hover
  opacity 0.7

.type.active
  opacity 1
</style>