<template>
  <section>
    <div class="row">
      <div class="type">
        {{ type }}
        <span @click="date.add()" v-if="!date.timestamp"
          ><i class="iconify" data-icon="la:plus"></i
        ></span>
      </div>
      <div class="date" v-if="date.timestamp">
        {{ date.local }}
        <span v-if="editable" @click="date.edit = !date.edit"
          ><i class="iconify" data-icon="la:pen"></i
        ></span>
        <span @click="date.remove"
          ><i class="iconify" data-icon="la:trash"></i
        ></span>
        <form v-if="editable" v-show="date.edit" @submit.prevent>
          <input
            type="date"
            name="date"
            pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}"
            @input="date.set($event)"
            :value="date.value"
          />
        </form>
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
      timestamp: Date.now(),
      gun: computed(() => gun.get(props.id).get(`date-${props.type}`)),
      value: computed(() =>
        new Date(date.timestamp).toLocaleDateString("en-CA")
      ),
      local: computed(() => new Date(date.timestamp).toLocaleDateString()),
      add() {
        date.gun.put(Date.now());
      },
      remove() {
        date.gun.put(null);
      },
      set(ev) {
        let timestamp = Date.parse(ev.target.value);
        date.gun.put(timestamp);
        date.edit = false;
      },
    });

    date.gun.on((t) => {
      date.timestamp = t;
    });

    return {
      date,
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