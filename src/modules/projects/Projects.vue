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

      <button @click="addProject()">add</button>
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
      </div>
    </transition-group>
  </article>
</template>

<script>
import { reactive } from "vue";
import { generateWords } from "../../use/randomWords.js";
import { itemColor } from "../../use/colors.js";
import { useSorter } from "../../use/useSorter.js";
import { db, soul } from "../../store/gun-db.js";
import { notify } from "../../store/history.js";
export default {
  setup() {
    const projects = reactive({});

    const { sorted, options } = useSorter(projects);

    db.get("projects")
      .map()
      .on((data, key) => {
        if (projects[key]) {
          projects[key] = null;
        }
        projects[key] = data;
      });

    function addProject() {
      let title = generateWords(2).join(" ");
      db.get("projects")
        .get(title)
        .put(
          {
            title,
            createdAt: Date.now(),
          },
          (ack) => {
            if (!ack.err) {
              notify(`Project ${title} added`);
            }
          }
        );
    }

    function formatDate(date) {
      return new Date(date).toLocaleString();
    }

    return {
      soul,
      projects,
      options,
      sorted,
      addProject,
      itemColor,
      formatDate,
    };
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