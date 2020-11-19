<template>
  <article>
    <header class="bar">
      <div class="title">
        Projects <span class="tag">{{ sorted.count }}</span>
      </div>
      <button
        v-for="(by, key) in options.orderBy"
        :key="key"
        :class="{ active: by }"
        @click="options.orderBy[key] = !options.orderBy[key]"
      >
        {{ key }}
      </button>

      <button @click="addItem()">add</button>
    </header>
    <transition-group name="list">
      <div
        class="project"
        v-for="project in sorted.data"
        :key="project.soul"
        :style="{ backgroundColor: itemColor(project.soul) }"
      >
        <div class="title info">
          <router-link
            :to="{ name: 'project', params: { id: project.title } }"
            >{{ project.title }}</router-link
          >
        </div>
        <div class="info">
          <img
            v-if="project.author.avatar"
            class="avatar-small"
            :src="project.author.avatar"
            alt=""
          />
          by {{ project.author.alias }} {{ format(project.createdAt) }}
        </div>
        <div class="info" v-if="project.updatedAt">
          Updated: {{ format(project.updatedAt) }}
        </div>
        <div class="spacer"></div>
        <item-rating :item="project.soul"></item-rating>
      </div>
    </transition-group>
  </article>
</template>

<script>
import { itemColor } from "../../use/colors.js";
import { format } from "timeago.js";
// https://github.com/hustcc/timeago.js/blob/7ebf670ec3d47af66b175225eb675354d12951c2/src/lang/ru.ts
import { useItems } from "../../use/useItems.js";
import ItemRating from "../../components/ItemRating.vue";
export default {
  components: {
    ItemRating,
  },
  setup() {
    const projects = useItems("project");
    return { ...projects, format, itemColor };
  },
};
</script>

<style scoped>
.project {
  display: flex;
  align-items: stretch;
  margin: 0.5em;
  padding: 0.5em;
}
.info {
  padding: 0.5em;
}
.avatar-small {
  height: 1.5em;
  border-radius: 2em;
}
</style>