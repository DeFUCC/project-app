<template lang="pug">
.rating(:class="{ horizontal }")
  .star(@click.stop="rate('star')", :class="{ active: myRate.star }")
    i(v-show="!myRate.star")
      span.iconify(data-icon="la:star")
    i(v-show="!!myRate.star")
      span.iconify(data-icon="la:star-solid")
    span(v-show="count.star") {{ count.star }}
  .seen(@click.stop="rate('seen')", :class="{ active: myRate.seen }")
    i(v-show="!myRate.seen")
      span.iconify(data-icon="la:eye")
    i(v-show="!!myRate.seen")
      span.iconify(data-icon="la:eye-slash")
    span(v-show="count.seen") {{ count.seen }}
  .trash(@click.stop="rate('trash')", :class="{ active: myRate.trash }")
    i(v-show="!myRate.trash")
      span.iconify(data-icon="la:trash-alt")
    i(v-show="!!myRate.trash")
      span.iconify(data-icon="la:trash-restore-alt")
    span(v-show="count.trash") {{ count.trash }}
</template>

<script>
import { defineComponent, ref, watchEffect } from "vue";
import { useItemRating } from "../../use/rating";
export default defineComponent({
  props: {
    id: String,
    horizontal: Boolean,
  },
  setup(props) {
    let { count, myRate, rate } = useItemRating(props.id);

    return {
      count,
      myRate,
      rate,
    };
  },
});
</script>

<style lang="stylus" scoped>
.rating
  display flex
  flex-flow column nowrap
  align-items stretch
  justify-items stretch
  font-size 1em
  min-height 3em

.rating.horizontal
  flex-flow row nowrap

.rating > div
  padding 0.5em
  margin 0 0.5em
  display flex
  flex 1 1 1em
  align-items center
  justify-content center
  cursor pointer
  opacity 0.5

i
  padding-top 2px

.rating img
  max-height 1.4em
  height 2em
  padding 0em 0.2em 0 0

.rating div.active
  opacity 1
</style>