<template>
  <section>
    <div class="row">
      <div class="type">
        {{ type }}
        <span @click="add()" v-if="!date.timestamp && editable"
          ><i class="iconify" data-icon="la:plus"></i
        ></span>
      </div>
      <div class="date" v-if="date.timestamp">
        {{ parsed.toLocaleDateString() }}
        <div class="edit" v-if="editable">
          <span @click="date.edit = !date.edit"
            ><i class="iconify" data-icon="la:pen"></i
          ></span>
          <span @click="remove()"
            ><i class="iconify" data-icon="la:trash"></i
          ></span>
          <form v-show="date.edit" @submit.prevent>
            <input
              type="date"
              name="date"
              pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}"
              @input="set($event)"
              :value="parsed.toLocaleDateString('en-CA')"
            />
          </form>
        </div>
      </div>
    </div>
  </section>
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

    const dateGun = gun.get(props.id).get(`date-${props.type}`);

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

<style scoped>
section {
  padding: 0 2em;
}
.row {
  display: flex;
}
.row > div {
  padding: 0.5em;
}
.date {
  display: flex;
  align-items: center;
}
form {
  margin: 0 0.5em;
}
</style>