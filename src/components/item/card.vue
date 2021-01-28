<template lang="pug">
li.card(
  :style="{ backgroundColor: itemColor(item.soul), borderColor: itemColor(item.parent) }"
)
  .content
    item-route.small(v-if="showRoute", :id="item.parent")
    .header 
      .title
        type-icon.type-icon(:type="item.type") 
        .name {{ item.title }}
          span.unlink(v-if="unlinkable", @click.stop.prevent="$emit('del')")
            i.iconify(data-icon="la:unlink")
      .description(v-if="item.subtitle") {{ item.subtitle }}
    .info
      edit-status(:id="item.soul", :editable="isMine(item.soul)")
      user-pill(:id="item?.soul.slice(1, 88)")
      comment-count(:id="item.soul")
  slot
  .icon(v-if="item.icon")
    img(:src="item.icon")
  aside.side
    item-children(:id="item.soul")
</template>

<script setup lang="ts">
import { itemColor } from "../../use/colors";
import { defineEmit, defineProps } from "vue";
import { isMine } from "../../store/user";

defineEmit(["del"]);

const props = defineProps({
  showRoute: {
    type: Boolean,
    default: true,
  },
  unlinkable: {
    type: Boolean,
    default: false,
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
  padding 0.5em

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
  font-weight bold
  flex 1

.description
  font-size 14px
  flex 1 0 100%
  margin 0.5em

.content
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
  flex-flow row
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

.unlink
  margin 0 0.5em

.side
  flex 0
  display flex
  flex-flow row nowrap
  justify-content stretch
  align-items stretch
</style>