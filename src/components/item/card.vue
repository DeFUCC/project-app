<template>
  <li
    class="item"
    :style="{
      backgroundColor: itemColor(item.soul),
    }"
  >
    <div class="main">
      <div class="icon" v-if="item.icon">
        <img :src="item.icon" />
      </div>
      <div class="content">
        <h3 class="title">
          <IconType :type="item.type" />{{ truncate(item.title) }}
        </h3>

        <div class="info" @click.stop>
          <UserPill :author="item?.soul.slice(1, 88)" />
          &nbsp;
          <ItemInfoDate :item="item" />
        </div>
      </div>

      <div class="spacer"></div>
      <div class="counters">
        <ItemCount
          :id="item.soul"
          :type="type"
          v-for="type in model[item.type]"
          :key="type"
        />
      </div>

      <RatingBlock :item="item.soul" />
    </div>
  </li>
</template>

<script>
import { model } from "../../store/model";
import { itemColor } from "../../tools/colors";
import { computed } from "vue";
import { truncate } from "../../use/item";

export default {
  props: {
    item: {
      type: Object,
      default: {
        type: "item",
        title: "Basic item",
        author: {
          alias: "No author",
          avatar: null,
        },
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
};
</script>

<style scoped>
.title h2 {
  margin: 0;
  font-size: 1.2em;
  line-height: 1.4em;
}
.main {
  display: flex;
  flex: 1;
  align-items: stretch;
}
.content {
  padding: 0.5em;
  align-self: center;
}
.title {
  display: flex;
  align-items: center;
}
.counters {
  display: flex;
  justify-content: stretch;
  align-items: stretch;
  flex-flow: column nowrap;
}
.item {
  cursor: pointer;
  display: flex;
  flex-flow: column;
  align-items: stretch;
  padding: 0;
  flex: 0 0 5em;
  min-height: min-content;
}
.info {
  font-size: 0.7em;
  display: flex;
  align-items: center;
  display: flex;
  padding: 4px;
}
.icon {
  display: flex;
  align-items: center;
  padding: 8px 0 8px 8px;
}
.icon img {
  border-radius: 5em;
}
</style>