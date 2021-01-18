<template lang="pug">
.row(v-if="date.timestamp || editable")
  .type
    | {{  $t(&quot;date.&quot; + type)  }}
    button(@click="add()", v-if="!date.timestamp && editable")
      i.iconify(data-icon="la:plus")
    button(@click="remove()")
      i.iconify(data-icon="la:trash")
  .date(v-if="date.timestamp") {{ parsed.toLocaleDateString() }}
    .edit(v-if="editable")
      button(@click="date.edit = !date.edit")
        i.iconify(data-icon="la:pen")
    form(v-show="date.edit", @submit.prevent="")
      input(
        type="date",
        name="date",
        pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}",
        @input="set($event)",
        :value="parsed.toLocaleDateString('en-CA')"
      )
</template>

<script lang="ts">
import { computed, defineComponent, reactive, ref } from "vue";
import { gun } from "../../store/gun-db";

export default defineComponent({
  props: {
    id: String,
    type: {
      type: String,
      default: "start",
    },
    editable: Boolean,
  },
  setup(props) {
    const date = reactive({
      edit: false,
      timestamp: undefined,
    });

    const dateName = props.type.charAt(0).toUpperCase() + props.type.slice(1);

    const dateGun = gun.get(props.id).get(`date${dateName}`);

    const parsed = computed(() => new Date(date.timestamp));

    function add() {
      dateGun.put(Date.now());
    }
    function remove() {
      dateGun.put(null);
    }
    function set(ev) {
      let timestamp = Date.parse(ev.target.value);
      dateGun.put(timestamp);
      date.edit = false;
    }

    dateGun.on((t) => {
      date.timestamp = t;
    });

    return {
      date,
      parsed,
      add,
      remove,
      set,
    };
  },
});
</script>

<style lang="stylus" scoped>
.row
  flex 1 1 50%
  display flex
  flex-flow column
  padding 0 2em

.type
  font-size 0.8em
  padding 0.5em 0
  color var(--text-light)

.date
  display flex
  align-items center

form
  margin 0 0.5em
</style>