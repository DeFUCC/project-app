<template>
  <form id="edit" @submit.prevent>
    <div class="row">
      <IconType :type="type" />
      + {{ parent }} <br />
      {{ item }}
    </div>
    <div class="row">
      <label for="title">Title</label>
      <input type="text" id="title" v-model="data.title" />
      <button v-if="!data.title" @click="data.title = generateWords(1, 4)">
        Gen
      </button>
    </div>
    <div class="row">
      <label for="description">Desc</label>
      <textarea rows="5" id="description" v-model="data.description" />
      <button
        v-if="!data.description"
        @click="data.description = generateWords(2, 100)"
        class=""
      >
        Gen
      </button>
    </div>
    <div class="row">
      <img class="logo" v-if="data.logo" :src="data.logo" />
      <EditFile @loaded="process"></EditFile>
    </div>
    <button type="submit" v-if="item" @click="editItem()" class="bottom">
      Save
    </button>
    <button type="submit" v-if="!item" @click="addItem()" class="bottom">
      Create
    </button>
  </form>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, ref, watchEffect } from "vue";
import { getState, gun } from "../../store/gun-db";
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
    item: String,
  },
  emits: ["added", "edited"],
  setup(props, { emit }) {
    const data = reactive({
      title: "",
      description: "",
      logo: "",
    });

    watchEffect(() => {
      if (props.item) {
        gun
          .get(props.item)
          .map()
          .on((d, key) => {
            data[key] = d;
          });
      }
    });

    function process(img) {
      if (!img.content) return;
      data.logo = img.content;
    }

    async function editItem() {
      let query = gun.get(props.item);
      query.put(data);
      query.get("updatedAt").put(getState());
      emit("edited");
    }

    async function addItem() {
      let added = await createItem(props.type, data, props.parent);
      emit("added");
    }
    return {
      process,
      data,
      addItem,
      generateWords,
      editItem,
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