<template>
  <li
    class="item"
    :style="{
      backgroundColor: itemColor(item.soul),
      borderColor: itemColor(item.parent),
    }"
  >
    <main class="main">
      <header class="icon" v-if="item.icon">
        <img :src="item.icon" />
      </header>

      <article class="content">
        <div class="title">
          <div class="route">
            <ItemRoute :id="item.parent" />
          </div>
          <div class="pill">
            <IconType :type="item.type" class="type-icon" />
            {{ truncate(item.title) }}
          </div>
        </div>

        <div class="info" @click.stop>
          <EditStatus :id="item.soul" />
          <UserPill :id="item?.soul.slice(1, 88)" />
          <ItemDate :item="item" />
          <CommentCount :id="item.soul" />
        </div>
      </article>

      <aside class="side">
        <ItemChildren :id="item.soul" />
      </aside>
    </main>
  </li>
</template>

<script>
import { model } from "../../store/model";
import { itemColor } from "../../tools/colors";
import { computed, defineComponent } from "vue";
import { truncate } from "../../use/item";

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
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-start;
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
  flex: 1 1 100%;
}
.type-icon {
  height: 2em;
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
  flex: 1 1 300px;
  min-height: min-content;
  border-radius: var(--small-radius);
  border-left: 6px solid #999;
}
.info {
  font-size: 0.8em;
  display: flex;
  flex: 1 0 300px;
  flex-flow: row wrap;
  align-items: center;
}
.icon {
  display: flex;
  align-items: center;
  padding: 8px;
  flex: 1 0 60px;
}
.icon img {
  border-radius: 4em;
  height: 4em;
}
.side {
  flex: 0;
  display: flex;
  flex-flow: row nowrap;
  justify-content: stretch;
  align-items: stretch;
}
.route {
  font-size: 10px;
  flex: 1 1 100%;
}
</style>