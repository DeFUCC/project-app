
<template>
  <span
    :style="{
      backgroundColor: itemColor(link),
    }"
    class="row"
    v-if="link"
  >
    <IconType :type="item.type" /> {{ item.title }}
    <span v-if="editable" @click="edit = !edit">
      <span class="iconify" data-icon="la:pen"></span>
    </span>
    <select
      v-if="edit"
      name="parent"
      v-model="selected"
      @input="
        $emit('select', selected);
        console.log('hmm');
      "
    >
      <option
        v-for="option in options"
        :key="option.title"
        :value="option.title"
      >
        {{ option.title }}
      </option>
    </select>
  </span>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, watchEffect } from "vue";
import { appPath, gun } from "../../store/gun-db";
import { itemColor } from "../../tools/colors";

export default defineComponent({
  emits: ["select"],
  props: {
    link: String,
    editable: Boolean,
  },
  setup(props, { emit }) {
    const item = reactive({
      title: "",
      type: "design",
    });
    gun
      .get(props.link)
      .map()
      .on((data, key) => {
        item[key] = data;
      });

    const options = reactive({});
    const edit = ref(false);
    const selected = ref();
    watchEffect(() => {
      if (edit.value) {
        gun
          .user()
          .get(appPath)
          .get(item.type)
          .map()
          .on((data, key) => {
            options[key] = data;
          });
      }
    });

    return {
      itemColor,
      item,
      options,
      selected,
      edit,
    };
  },
});
</script>

<style scoped>
.row {
  display: flex;
  align-items: center;
}
</style>