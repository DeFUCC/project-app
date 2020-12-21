<template>
  <form ref="form" id="edit" @submit.prevent>
    <div class="row">
      <IconType :type="type" />
      + {{ parent }} <br />
    </div>
    <div class="row">
      <label for="title">Title</label>
      <input type="text" id="title" v-model="data.title" />
      <button @click="data.title = generateWords(1, 4)">Gen</button>
    </div>
    <div class="row">
      <label for="description">Desc</label>
      <textarea rows="5" id="description" v-model="data.description" />
      <button @click="data.description = generateWords(2, 100)" class="">
        Gen
      </button>
    </div>
    <button type="submit" @click="addItem()" class="bottom">Create</button>
  </form>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, ref } from "vue";
import { generateWords } from "../../tools/randomWords";
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
  emits: ["added"],
  setup(props, { emit }) {
    const data = reactive({
      title: "",
      description: "",
    });
    const form = ref(null);
    onMounted(() => {
      form.value.scrollIntoView({ behavior: "smooth" });
    });

    async function addItem() {
      let added = await createItem(props.type, data, props.parent);
      emit("added");
    }
    return {
      data,
      addItem,
      form,
      generateWords,
    };
  },
});
</script>

<style scoped>
#edit {
  padding: 1em;
  position: relative;
}
.row {
  display: flex;
  align-items: center;
  padding: 0.2em 0;
  border-bottom: 1px solid hsla(0, 0%, 0%, 0.1);
}
.bottom {
  width: 100%;
}
</style>