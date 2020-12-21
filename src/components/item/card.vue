<template>
  <li
    class="item"
    :style="{
      backgroundColor: itemColor(item.soul),
    }"
  >
    <div class="main">
      <div class="title">
        <h2>{{ item.title }}</h2>
        <div
          class="info"
          :style="{
            backgroundColor: itemColor(item.createdBy),
          }"
        >
          <IconType :type="item.type" />

          <UserAvatar size="small" :pic="item.author.avatar" />&nbsp;
          {{ item.author.alias }}
          {{ format(item.createdAt, "short") }}
          <span v-if="item.updatedAt">
            , upd {{ format(item.updatedAt, "short") }}
          </span>
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

      <ItemRating :item="item.soul" />
    </div>
  </li>
</template>

<script>
import { format } from "timeago.js";
import { model } from "../../store/model";
import { itemColor } from "../../tools/colors";

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

  setup() {
    return {
      model,
      itemColor,
      format,
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
.title {
  padding: 0.5em;
  align-self: center;
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
  flex: 1 1 4em;
}
.info {
  opacity: 0.5;
  font-size: 0.7em;
  display: flex;
  align-items: center;
  display: flex;
  padding: 4px;
}
</style>