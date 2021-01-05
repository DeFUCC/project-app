<template>
  <section class="bar">
    <div class="title">
      <img
        v-if="type"
        class="icon bigger"
        :src="'/svg/' + type + '.svg'"
        alt=""
      />
      <span class="tag">{{ sorted.count }}/{{ sorted.total }} </span>
    </div>
    <ListFilter
      :my="options.filterMy"
      @star="options.filterMy.star = !options.filterMy.star"
      @seen="options.filterMy.seen = !options.filterMy.seen"
      @trash="options.filterMy.trash = !options.filterMy.trash"
    />
    <ListOrder
      :by="options.orderBy"
      @order="options.orderBy = $event"
      v-show="sorted.count > 0"
    />
    <div class="spacer"></div>
    <AddForm key="add" :type="type" :parent="parent" />
    <ListSearch @search="options.search = $event" />
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    parent: String,
    type: String,
    options: Object,
    sorted: Object,
  },
  setup() {
    return {};
  },
});
</script>

<style scoped>
.bar {
  display: flex;
  position: sticky;
  z-index: 20;
  top: 24px;
  min-height: 3em;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: flex-start;
  padding: 0.5em;
  background-color: var(--bar-color);
  margin: 2em 0.5em 0.5em 0.5em;
}
.tag {
  font-size: 0.8em;
  display: block;
  color: var(--text-light);
  white-space: nowrap;
}
.bar > .title {
  padding: 0;
  font-size: 1.2em;
  font-weight: bold;
  display: flex;
  align-items: center;
}
</style>