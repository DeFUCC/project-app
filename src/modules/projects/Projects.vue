<template>
  <article>
    <header class="bar">
      <div class="title">
        Projects <span class="tag">{{ sorted.count }}</span>
      </div>

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
        <div class="created">
          Created: {{ new Date(project.createdAt).toLocaleString() }}
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
export default {
  setup() {
    const projects = reactive({});

    const { sorted } = useSorter(projects);

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
      db.get("projects").get(title).put({
        title,
        createdAt: Date.now(),
      });
    }

    return {
      soul,
      projects,
      sorted,
      addProject,
      itemColor,
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