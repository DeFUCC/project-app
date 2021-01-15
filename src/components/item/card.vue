<template lang="pug">
li.item(
  :style="{ backgroundColor: itemColor(item.soul), borderColor: itemColor(item.parent) }"
)
  main.main
    header.icon(v-if="item.icon")
      img(:src="item.icon")
    article.content
      .title
        .route
          item-route(:id="item.parent")
        .pill
          icon-type.type-icon(:type="item.type") 
          .name {{ truncate(item.title) }}
        .description(v-if="item.description") {{ item.description }}
      .info
        edit-status(:id="item.soul")
        user-pill(:id="item?.soul.slice(1, 88)")
        comment-count(:id="item.soul")
    aside.side
      item-children(:id="item.soul")
</template>

<script>
import { model } from "../../store/model";
import { itemColor } from "../../use/colors";
import { computed, defineComponent } from "vue";
import { truncate } from "../../store/item";

export default defineComponent({
  props: {
    item: {
      type: Object,
      default: {
        type: "item",
        title: "Basic item",
        createdAt: 345298357,
        updatedAt: 3482489005,
        soul: "example",
      },
    },
  },

  setup(props) {
    return {
      model,
      truncate,
      itemColor,
    };
  },
});
</script>

<style lang="stylus" scoped>
.title
  flex-flow row wrap
  margin 0
  display flex
  align-items center
  flex 1 1 100%

.pill
  display flex
  align-items center

.pill .name
  margin 0
  display flex
  align-items center
  font-size 1.2em
  line-height 1.4em
  flex 1

.description
  font-size 14px
  flex 1 0 100%
  padding 6px

.main
  display flex
  flex 1
  align-items stretch

.content
  padding 0.5em
  align-self center
  width 100%
  display flex
  flex-flow row wrap
  justify-content flex-start

.type-icon
  height 2em

.title .type
  height 2em

.item
  cursor pointer
  display flex
  flex-flow column
  align-items stretch
  padding 0
  flex 1 1 600px
  min-height min-content
  border-radius var(--small-radius)
  border-left 6px solid #999

.info
  font-size 0.8em
  display flex
  flex 1 0 300px
  flex-flow row wrap
  align-items center

.icon
  display flex
  align-items center
  padding 8px
  flex 1 0 60px

.icon img
  border-radius 4em
  height 4em

.side
  flex 0
  display flex
  flex-flow row nowrap
  justify-content stretch
  align-items stretch

.route
  font-size 10px
  flex 1 1 100%
</style>