<template>
  <div class="rating">
    <div
      class="star"
      @click.stop="rate('star')"
      :class="{ active: myRate.star }"
    >
      <i v-show="!myRate.star">
        <span class="iconify" data-icon="la:star" data-inline="false"></span>
      </i>
      <i v-show="!!myRate.star">
        <span
          class="iconify"
          data-icon="la:star-solid"
          data-inline="false"
        ></span>
      </i>
      {{ count.star }}
    </div>
    <div
      class="seen"
      @click.stop="rate('seen')"
      :class="{ active: myRate.seen }"
    >
      <i v-show="!myRate.seen">
        <span class="iconify" data-icon="la:eye" data-inline="false"></span>
      </i>
      <i v-show="!!myRate.seen">
        <span
          class="iconify"
          data-icon="la:eye-slash"
          data-inline="false"
        ></span>
      </i>
      {{ count.seen }}
    </div>
    <div
      class="trash"
      @click.stop="rate('trash')"
      :class="{ active: myRate.trash }"
    >
      <i v-show="!myRate.trash">
        <span
          class="iconify"
          data-icon="la:trash-alt"
          data-inline="false"
        ></span>
      </i>
      <i v-show="!!myRate.trash">
        <span
          class="iconify"
          data-icon="la:trash-restore-alt"
          data-inline="false"
        ></span>
      </i>
      {{ count.trash }}
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, watchEffect } from "vue";
import { useItemRating } from "../../use/rating";
export default defineComponent({
  props: {
    item: String,
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
.star {
  background-color: hsla(0, 0%, 100%, 0.4);
}
.seen {
  background-color: hsla(0, 0%, 50%, 0.4);
}
.trash {
  background-color: hsla(0, 0%, 0%, 0.4);
}
.rating img {
  max-height: 1.4em;
  height: 2em;
  padding: 0em 0.2em 0 0;
}
.rating div.active {
  opacity: 0.7;
}
</style>