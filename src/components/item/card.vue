<template lang="pug">
li.card(
  :style="{ backgroundColor: itemColor(item.soul), borderColor: itemColor(item.parent) }"
)
  .main
    .content
      .header 
        .route(v-if="options.route")
          item-route(:id="item.parent")
        .title
          item-type.type-icon(:type="item.type") 
          .name {{ item.title }}
        .description(v-if="item.subtitle") {{ item.subtitle }}
      .info
        edit-status(:id="item.soul", :editable="isMine(item.soul)")
        user-pill(:id="item?.soul.slice(1, 88)")
        comment-count(:id="item.soul")
    .icon(v-if="item.icon")
      img(:src="item.icon")
    aside.side
      item-children(:id="item.soul")
</template>

<script setup lang="ts">
import { itemColor } from "../../use/colors";
import { defineProps } from "vue";
import { isMine } from "../../store/user";

const props = defineProps({
  options: {
    type: Object,
    default: {
      route: true,
    },
  },
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
});
</script>

<style lang="stylus" scoped>
.header
  flex-flow row wrap
  display flex
  align-items center
  flex 1 1 100%

.title
  margin 4px 0
  display flex
  align-items center

.title .name
  margin 0
  display flex
  align-items center
  font-size 1.2em
  line-height 1.4em
  flex 1

.description
  font-size 14px
  flex 1 0 100%
  margin 0.5em

.main
  display flex
  flex 1
  align-items stretch

.content
  padding 1em 0.5em
  align-self center
  width 100%
  display flex
  flex-flow row wrap
  justify-content flex-start

.type-icon
  height 2em

.title .type
  height 2em

.card
  margin 0.5em
  scroll-snap-align start
  cursor pointer
  position relative
  display flex
  flex-flow column
  align-items stretch
  padding 0
  flex 1 1 360px
  min-height min-content
  border-radius var(--small-radius)

.info
  font-size 0.7em
  margin 0.5em 0
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