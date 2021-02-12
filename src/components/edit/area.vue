<template lang="pug">
.area Area
  input(type="text", list="areas", v-model="newArea")
  datalist#areas
    option(v-for="(ar, k) in areas", :key="k") {{ k }}
  button(@click="setArea()") Set
</template>

<script setup >
import { defineProps, reactive, ref } from "vue";
import { db, gun } from "store@gun-db";

const props = defineProps({
  id: String,
});

const area = ref("");
const newArea = ref("");
const areas = reactive({});

const itemRef = gun.get(props.id);

itemRef.get("area").on((data) => {
  area.value = data;
  newArea.value = data;
});

function setArea() {
  itemRef.get("area").put(newArea.value);
  db.get("area").get(newArea.value).get(props.id).put(itemRef);
}

db.get("area")
  .map()
  .on((data, key) => {
    areas[key] = data;
  });
</script>

<style lang="stylus" scoped></style>