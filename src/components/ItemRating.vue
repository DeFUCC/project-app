<template>
  <div class="rating">
    <button class="minus">- {{ rating.count.minus }}</button>
    <button class="zero">{{ rating.count.zero }}</button>
    <button class="plus" @click="rate.plus(item)">
      + {{ rating.count.plus }}
    </button>
    {{ rating.plused }}
  </div>
</template>

<script>
import { useItemRating } from "../use/useItemRating.js";
import { soul } from "../store/gun-db.js";
export default {
  props: {
    item: String,
  },
  setup(props) {
    const itemRating = useItemRating(props.item);
    return itemRating;
  },
};
</script>

<style>
</style>