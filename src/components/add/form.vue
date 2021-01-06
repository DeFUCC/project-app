<template>
  <form class="add" v-if="canAdd" @submit.prevent>
    <input class="title" placeholder="+" type="text" v-model.trim="add.title" />
    <button v-if="add.title" @click="addItem()">
      <span class="iconify" data-icon="la:plus"></span>
    </button>
  </form>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, watchEffect } from "vue";
import { error } from "../../store/history";
import { user } from "../../store/user";
import { createItem } from "../../use/item";

export default defineComponent({
  emits: ["search"],
  props: {
    type: String,
    parent: String,
    editable: Boolean,
  },
  setup(props, { emit }) {
    const add = reactive({
      title: null,
    });

    watchEffect(() => {
      emit("search", add.title);
    });

    async function addItem() {
      let added = await createItem(props.type, add, props.parent);
      add.title = "";
    }

    const canAdd = computed(() =>
      Boolean(
        (!props.parent && user.is) ||
          (props.parent && user.is?.pub == props.parent.slice(1, 88))
      )
    );

    return {
      canAdd,
      add,
      addItem,
    };
  },
});
</script>

<style scoped>
.add {
  scroll-snap-align: start end;
}
form {
  display: flex;
  align-items: center;
  padding: 1em;
}
.title {
  margin: 0;
  flex: 1 0;
  font-size: 1em;
  border: 1px solid #aaa;
  outline: none;
  width: 1em;
  transition: all 300ms ease-in-out;
}
.title:focus {
  width: 6em;
}
</style>