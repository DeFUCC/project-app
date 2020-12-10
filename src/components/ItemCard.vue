<template>
  <li
    @click="
      $emit('open', {
        type: item.type,
        id: item.soul,
      })
    "
    class="item"
    :style="{
      backgroundColor: itemColor(item.soul),
      borderColor: itemColor(item.soul.substring(1, 88)),
    }"
  >
    <div class="main">
      <div class="info">
        <img
          v-if="item.type"
          class="icon"
          :src="'/svg/' + item.type + '.svg'"
          alt=""
        />
        <UserAvatar size="small" :pic="item.author.avatar" />
        {{ format(item.createdAt, "short") }}
        <span v-if="item.updatedAt">
          , upd {{ format(item.updatedAt, "short") }}
        </span>
      </div>

      <div class="title">
        <h2>{{ item.title }}</h2>
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
  </li>
</template>

<script>
import { model } from "../store/model.js";
import { itemColor } from "../use/colors.js";
import { format } from "timeago.js";

export default {
  emits: ["open"],
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
  padding: 0.5em;
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
  align-items: stretch;
  margin: 0.5em;
  padding: 0.5em;
  scroll-snap-align: start end;
  flex: 1 1 4em;
  border-left: 4px solid;
}
.info {
  font-size: 0.7em;
  display: flex;
  align-items: center;
}
</style>