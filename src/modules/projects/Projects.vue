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
        :key="soul(project)"
        :style="{ backgroundColor: itemColor(soul(project)) }"
      >
        <div class="title">
          <router-link
            :to="{ name: 'project', params: { id: project.title } }"
            >{{ project.title }}</router-link
          >
        </div>
        <div>Created: {{ formatDate(project.createdAt) }}</div>
        <div v-if="project.updatedAt">
          Updated: {{ formatDate(project.updatedAt) }}
        </div>
        <item-rating :item="project.soul"></item-rating>
      </div>
    </transition-group>
  </article>
</template>

<script>
import { useItems } from "../../use/useItems.js";
import ItemRating from "../../components/ItemRating.vue";
export default {
  components: {
    ItemRating,
  },
  setup() {
    const projects = useItems("project");
    return projects;
  },
};
</script>

<style scoped>
.project {
  padding: 0.2em;
  display: flex;
}
.project > div {
  padding: 0.5em;
}
</style>