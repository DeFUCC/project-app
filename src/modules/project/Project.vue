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
      <div class="spacer"></div>
      <item-rating :item="project.soul"></item-rating>
    </header>

    <div>Created {{ format(project.createdAt) }}</div>
    <div v-if="project.updatedAt">
      Updated
      {{ format(project.updatedAt) }}
    </div>
    <button @click="update()">update</button>
  </section>

  <section v-else>Project {{ id }} not found</section>
</template>

<script>
import { useItem } from "../../use/useItem.js";
import { itemColor } from "../../use/colors.js";
import { format } from "timeago.js";
import itemRating from "../../components/ItemRating.vue";
export default {
  props: {
    id: String,
  },
  components: {
    itemRating,
  },
  setup(props) {
    const project = useItem(props.id);
    return {
      ...project,
      itemColor,
      format,
    };
  },
};
</script>

<style scoped>
</style>