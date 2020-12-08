<template>
  <ul class="item-list">
    <transition-group name="list">
      <item-card
        v-for="project in items"
        :key="project.soul"
        :item="project"
      ></item-card>
    </transition-group>
  </ul>
</template>

<script>
import ItemCard from "../item/ItemCard.vue";
export default {
  props: {
    items: Object,
  },
  components: {
    ItemCard,
  },
  setup() {
    return {};
  },
};
</script>

<style>
.item-list {
  display: flex;
  align-items: stretch;
  flex-flow: column nowrap;
  padding: 0;
  margin: 0;
  overflow: scroll;
  scroll-snap-type: y mandatory;
}
</style>