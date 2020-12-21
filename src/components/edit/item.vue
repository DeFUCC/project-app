<template>
  <form id="edit" @submit.prevent>
    {{ type }}
    {{ parent }} <br />
    <label for="title">Title</label>
    <input type="text" id="title" v-model="data.title" />
    <button @click="createItem(type, data, parent)">Create</button>
  </form>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
import { createItem } from "../../use/item";

export default defineComponent({
  props: {
    type: {
      type: String,
      default: "design",
    },
    parent: {
      type: String,
      default: null,
    },
  },
  setup(props) {
    const data = reactive({
      title: "",
    });
    createItem;
    return {
      data,
      createItem,
    };
  },
});
</script>

<style scoped>
#edit {
  padding: 1em;
}
</style>