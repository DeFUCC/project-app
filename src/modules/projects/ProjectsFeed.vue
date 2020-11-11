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
      <router-link :to="{ name: 'project', params: { id: project.title } }">{{
        project.title
      }}</router-link>
    </div>
  </section>
</template>

<script>
import { reactive } from "vue";
import { generateWords } from "../../use/randomWords.js";
import { itemColor } from "../../use/colors.js";
import { db } from "../../store/gun-db.js";
export default {
  setup() {
    const projects = reactive({});
    db.get("projects")
      .map()
      .on((data, key) => {
        projects[key] = data;
      });

    function addProject() {
      db.get("projects").set({
        title: generateWords(2).join(" "),
        createdAt: Date.now(),
      });
    }

    return {
      projects,
      addProject,
      itemColor,
    };
  },
};
</script>

<style scoped>
</style>