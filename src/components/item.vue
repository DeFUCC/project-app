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
        <div class="title">
          <div class="pill">
            <img
              class="type"
              v-if="item.type"
              :src="'/svg/' + item.type + '.svg'"
              alt=""
            />{{ truncate(item.title) }}
          </div>
          <ItemChildren :id="item.soul" />
        </div>

        <div class="info" @click.stop>
          <UserPill :author="item?.soul.slice(1, 88)" />
          &nbsp;
          <ItemInfoDate :item="item" />
          <ItemStatus :id="item.soul" />
          <div class="spacer"></div>

          <CommentCount :id="item.soul" />
        </div>
      </div>
    </div>
  </li>
</template>

<script>
import { model } from "../store/model";
import { itemColor } from "../tools/colors";
import { computed, defineComponent } from "vue";
import { truncate } from "../use/item";

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

<style scoped>
.title h3 {
  margin: 0;
  display: flex;
  align-items: center;
  font-size: 1.2em;
  line-height: 1.4em;
  flex: 1;
}
.main {
  display: flex;
  flex: 1;
  align-items: stretch;
}
.content {
  padding: 0.5em;
  align-self: center;
  width: 100%;
}
.pill {
  display: flex;
  align-items: center;
}
.title {
  flex-flow: row wrap;
  margin: 0;
  display: flex;
  align-items: center;
  font-size: 1.2em;
  line-height: 1.4em;
  flex: 1;
}
.title .type {
  height: 2em;
}
.item {
  cursor: pointer;
  display: flex;
  flex-flow: column;
  align-items: stretch;
  padding: 0;
  flex: 0 0 5em;
  min-height: min-content;
  border-radius: var(--small-radius);
}
.info {
  width: 100%;
  font-size: 0.8em;
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  padding: 4px;
}
.icon {
  display: flex;
  align-items: center;
  padding: 8px;
  flex: 1 0 90px;
}
.icon img {
  border-radius: 5em;
}
</style>