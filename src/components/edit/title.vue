<template>
  <div class="title">
    <IconType :type="type" />
    <h3 v-if="!edit">
      {{ text }}
      <span v-if="editable" class="edit" @click="edit = true"
        ><i class="iconify" data-icon="la:pen"></i
      ></span>
    </h3>
    <form
      @submit.prevent="
        $emit('update', newTitle);
        edit = false;
      "
      v-if="edit"
    >
      <input
        ref="title"
        @blur="
          $emit('update', newTitle);
          edit = false;
        "
        type="text"
        v-model="newTitle"
      />
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  props: {
    editable: Boolean,
    text: String,
    type: String,
  },
  setup(props) {
    const edit = ref(false);
    const newTitle = ref(props.text);
    return {
      edit,
      newTitle,
    };
  },
});
</script>

<style scoped>
</style>