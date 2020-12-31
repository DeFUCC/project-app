<template>
  <div class="rating" :class="{ horizontal }">
    <div
      class="star"
      @click.stop="rate('star')"
      :class="{ active: myRate.star }"
    >
      <i v-show="!myRate.star">
        <span class="iconify" data-icon="la:star"></span>
      </i>
      <i v-show="!!myRate.star">
        <span class="iconify" data-icon="la:star-solid"></span>
      </i>
      <span v-show="count.star">{{ count.star }}</span>
    </div>
    <div
      class="seen"
      @click.stop="rate('seen')"
      :class="{ active: myRate.seen }"
    >
      <i v-show="!myRate.seen">
        <span class="iconify" data-icon="la:eye"></span>
      </i>
      <i v-show="!!myRate.seen">
        <span class="iconify" data-icon="la:eye-slash"></span>
      </i>
      <span v-show="count.seen">{{ count.seen }}</span>
    </div>
    <div
      class="trash"
      @click.stop="rate('trash')"
      :class="{ active: myRate.trash }"
    >
      <i v-show="!myRate.trash">
        <span class="iconify" data-icon="la:trash-alt"></span>
      </i>
      <i v-show="!!myRate.trash">
        <span class="iconify" data-icon="la:trash-restore-alt"></span>
      </i>
      <span v-show="count.trash">{{ count.trash }}</span>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, watchEffect } from "vue";
import { useItemRating } from "../use/rating";
export default defineComponent({
  props: {
    item: String,
    horizontal: Boolean,
  },
  setup(props) {
    let { count, myRate, rate } = useItemRating(props.item);

    return {
      count,
      myRate,
      rate,
    };
  },
});
</script>

<style scoped>
.rating {
  display: flex;
  flex-flow: column nowrap;
  align-items: stretch;
  justify-items: stretch;
  font-size: 1em;
}
.rating.horizontal {
  flex-flow: row nowrap;
}
.rating > div {
  padding: 0.5em;
  margin: 0 0.5em;
  display: flex;
  flex: 1 1 1em;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  opacity: 0.5;
}
i {
  padding-top: 2px;
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