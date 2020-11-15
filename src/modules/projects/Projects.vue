<template>
  <section>
    Projects

    <button @click="addProject()">add</button>
    <div
      class="project"
      v-for="(project, key) in projects"
      :key="key"
      :style="{ backgroundColor: itemColor(key) }"
    >
      <div class="title">
        <router-link :to="{ name: 'project', params: { id: project.title } }">{{
          project.title
        }}</router-link>
      </div>
      <div class="created">
        Created: {{ new Date(project.createdAt).toLocaleString() }}
      </div>
    </div>
  </section>
</template>

<script>
import { reactive } from "vue";
import { generateWords } from "../../use/randomWords.js";
import { itemColor } from "../../use/colors.js";
import { useSorter } from "../../use/useSorter.js";
import { db, soul } from "../../store/gun-db.js";
export default {
  setup() {
    const { sorter } = useSorter();
    const projects = reactive({});
    db.get("projects")
      .map()
      .on((data, key) => {
        projects[key] = data;
      });

    function addProject() {
      db.get("projects")
        .get(generateWords(2).join(" "))
        .put({
          title: generateWords(2).join(" "),
          createdAt: Date.now(),
        });
    }

    return {
      soul,
      projects,
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