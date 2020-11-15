<template>
  <section v-if="project.soul">
    <header class="bar" :style="{ backgroundColor: itemColor(project.soul) }">
      <h1 v-if="!edit.title">
        {{ project.title }}
        <button @click="edit.title = !edit.title">Edit</button>
      </h1>
      <input
        type="text"
        v-if="edit.title"
        v-model="edited.title"
        @keypress.enter="update()"
      />
      <button v-if="edit.title" @click="update()">Save</button>
    </header>

    <div>Created: {{ new Date(project.createdAt).toLocaleString() }}</div>
    <div v-if="project.updatedAt">
      Updated:
      {{ new Date(project.updatedAt).toLocaleString() }}
    </div>
    <button @click="update()">update</button>
  </section>
  <section v-else>Project {{ id }} not found</section>
</template>

<script>
import { gun, db, soul } from "../../store/gun-db.js";
import { reactive, watchEffect } from "vue";
import { notify } from "../../store/history.js";
import { itemColor } from "../../use/colors.js";
export default {
  props: {
    id: String,
  },
  setup(props) {
    const edit = reactive({
      title: false,
    });
    const edited = reactive({
      title: "",
    });
    const project = reactive({});

    watchEffect(() => {
      db.get("projects")
        .map((proj, key) => {
          if (proj.title == props.id) {
            return proj;
          }
          return;
        })
        .on((data, key) => {
          getProject(soul(data));
        });
    });

    function getProject(id) {
      project.soul = id;
      gun
        .get(id)
        .map()
        .on((data, key) => {
          project[key] = data;
        });
    }

    function update() {
      if (!edited.title) {
        edit.title = false;
        return;
      }
      let title = project.title;
      gun.get(project.soul).put(
        {
          title: edited.title,
          updatedAt: Date.now(),
        },
        () => {
          notify(`Project ${title} is renamed to ${edited.title}`);
          edited.title = "";
          edit.title = false;
        }
      );
    }
    return {
      update,
      project,
      edit,
      edited,
      itemColor,
    };
  },
};
</script>

<style>
</style>