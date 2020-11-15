<template>
  <section v-if="project.soul">
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
import { reactive } from "vue";
import { notify } from "../../store/history.js";
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
    db.get("projects")
      .map((proj, key) => {
        if (proj.title == props.id) {
          return proj;
        }
        return;
      })
      .once((data, key) => {
        getProject(soul(data));
      });

    function getProject(key) {
      project.soul = key;
      gun
        .get(project.soul)
        .map()
        .on((data, ke) => {
          project[ke] = data;
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
    };
  },
};
</script>

<style>
</style>