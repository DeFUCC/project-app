<template lang="pug">
.row(v-if="timestamp || editable")
  .type
    | {{ $t('date.' + type) }}
    button(@click="add()", v-if="!timestamp && editable")
      i.iconify(data-icon="la:plus")
    button(@click="remove()", v-if="timestamp && editable")
      i.iconify(data-icon="la:trash")
  .date(v-if="timestamp") {{ parsed.toLocaleDateString() }}
    .edit(v-if="editable")
      button(@click="edit = !edit")
        i.iconify(data-icon="la:pen")
    form(v-show="edit", @submit.prevent="")
      input(
        type="date",
        name="date",
        pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}",
        @input="set($event)",
        :value="parsed.toLocaleDateString('en-CA')"
      )
</template>

<script setup >
import { computed, defineProps, ref } from "vue";
import { gun } from "../../store/gun-db";

const props = defineProps({
  id: String,
  type: {
    type: String,
    default: "start",
  },
  editable: Boolean,
});

const edit = ref(false);
const timestamp = ref();
const dateName = props.type.charAt(0).toUpperCase() + props.type.slice(1);
const dateGun = gun.get(props.id).get(`date${dateName}`);
const parsed = computed(() => new Date(timestamp.value));

function add() {
  dateGun.put(Date.now());
}
function remove() {
  dateGun.put(null);
}
function set(ev) {
  let timestamp = Date.parse(ev.target.value);
  dateGun.put(timestamp);
  edit.value = false;
}

dateGun.on((t) => {
  timestamp.value = t;
});
</script>

<style lang="stylus" scoped>
.row
  flex 1 1 50%
  display flex
  flex-flow column

.type
  font-size 0.8em
  padding 0.5em 0
  color var(--text-light)

.date
  display flex
  flex-flow row wrap
  align-items center

form
  margin 0 0.5em
</style>