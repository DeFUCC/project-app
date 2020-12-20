<template>
  <div class="rating">
    <div
      class="plus"
      @click.stop="r.rate.plus(item)"
      :class="{ active: r.rating.myRate }"
    >
      <IconStar :active="r.rating.myRate" />
      {{ r.rating.count.plus }}
    </div>
    <div class="zero">
      <IconEye :active="r.rating.myRate" />
      {{ r.rating.count.zero }}
    </div>
    <div class="minus">
      <IconTrash :active="!r.rating.myRate" />
      {{ r.rating.count.minus }}
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
    const r = ref({});
    watchEffect(() => {
      r.value = useItemRating(props.item);
    });
    return {
      r,
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
  opacity: 0.7;
}
</style>