<template>
  <div class="rating">
    <div
      class="plus"
      @click="rate.plus(item)"
      :class="{ active: rating.myRate }"
      :style="{
        flexGrow: rating.count.plus,
      }"
    >
      <img src="/icons/hero-outline.svg#plus" alt="" />
      {{ rating.count.plus }}
    </div>

    <div class="zero">
      <img src="/icons/hero-outline.svg#eye" alt="" />
      {{ rating.count.zero }}
    </div>
    <div class="minus">
      <img src="/icons/hero-outline.svg#x" alt="" /> {{ rating.count.minus }}
    </div>
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
    const { rating, rate } = useItemRating(props.item);
    return {
      rating,
      rate,
    };
  },
};
</script>

<style scoped>
.rating {
  display: flex;
  align-items: stretch;
  justify-items: stretch;
  font-size: 0.8em;
}
.rating div {
  padding: 0em 0.5em;
  display: flex;
  flex: 1 1 1em;
  align-items: center;
  cursor: pointer;
  opacity: 0.5;
}
.plus {
  background-color: hsla(0, 0%, 100%, 0.4);
}
.zero {
  background-color: hsla(0, 0%, 50%, 0.4);
}
.minus {
  background-color: hsla(0, 0%, 0%, 0.4);
}
.rating img {
  max-height: 1.4em;
  height: 2em;
  padding: 0em 0.2em 0 0;
}
.rating div.active {
  opacity: 1;
}
</style>