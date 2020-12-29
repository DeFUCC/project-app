
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
    <select v-if="edit" name="parent" @input="changeParent">
      <option
        v-for="option in options"
        :key="option.title"
        :value="option.soul"
      >
        {{ option.title }}
      </option>
    </select>
  </span>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, watchEffect } from "vue";
import { appPath, db, gun, soul } from "../../store/gun-db";
import { user } from "../../store/user";
import { itemColor } from "../../tools/colors";

export default defineComponent({
  emits: ["select"],
  props: {
    link: String,
    editable: Boolean,
    id: String,
  },
  setup(props, { emit }) {
    const item = reactive({
      title: "",
      type: "design",
    });
    watchEffect(() => {
      gun
        .get(props.link)
        .map()
        .on((data, key) => {
          item[key] = data;
        });
    });

    const options = reactive({});
    const edit = ref(false);
    const selected = ref();
    watchEffect(() => {
      if (edit.value) {
        db.get(item.type)
          .map()
          .on((data, key) => {
            options[key] = data;
            options[key].soul = soul(data);
          });
      }
    });

    function changeParent(val) {
      let newParent = val.target.value;
      gun.get(props.id).get("parent").put(newParent);
      let isMy = newParent.slice(1, 88) == user?.is?.pub;
      if (isMy) {
        console.log("do something to old and new parents");
      }
      edit.value = false;
    }

    return {
      changeParent,
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